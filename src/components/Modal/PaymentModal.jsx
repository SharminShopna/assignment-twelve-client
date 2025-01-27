import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, closeModal, orderId, amount, orderData, refetch, onPaymentSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  const { image, title, location, agentName, price, quantity, _id, status, propertyId } = orderData || {};

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (price && quantity) {
      getPaymentIntent();
    }
  }, [price, quantity]);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price,
        quantity,
        image,
        title,
        location,
        buyer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("Error fetching payment intent:", err);
      setError("Failed to fetch payment intent. Please try again.");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe is not loaded. Please try again later.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (paymentMethodError) {
        console.error("Payment method error:", paymentMethodError);
        setError(paymentMethodError.message);
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName || "Unknown",
            email: user?.email || "No Email",
          },
        },
      });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await handlePostPaymentSuccess(paymentIntent);
      }
    } catch (paymentError) {
      console.error("Payment processing error:", paymentError);
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePostPaymentSuccess = async (paymentIntent) => {
    try {
      await axiosSecure.post("/order", {
        price,
        quantity,
        transactionId: paymentIntent?.id,
        orderId,
        propertyId,
        image,
        title,
        buyer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      });

      await axiosSecure.patch(`/property/quantity/${propertyId}`, {
        quantity,
        status: "decrease",
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Payment for Order ID: ${orderId} of $${price} was successful!`,
      });
      setPaymentSuccess(true);
      if (typeof onPaymentSuccess === "function") {
        onPaymentSuccess(); 
      }
      refetch();
      navigate("/dashboard/propBought");
      closeModal();
    } catch (dbError) {
      console.error("Error saving payment data:", dbError);
      Swal.fire({
        icon: "error",
        title: "Payment Successful but Data Save Failed",
        text: "Please contact support with your transaction ID.",
      });
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handlePayment}>
          <CardElement className="border p-2 rounded mb-4" />
          <button
            type="submit"
            className="w-full bg-lime-700 text-white py-2 px-4 rounded hover:bg-lime-900 transition duration-200"
            disabled={!stripe || !clientSecret || processing || paymentSuccess}
          >
            {processing ? "Processing..." : paymentSuccess ? "Payment Successful" : `Pay $${price}`}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-red-600 opacity-75 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200"
          disabled={processing}
        >
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default PaymentModal;
