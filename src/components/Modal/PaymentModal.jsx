import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";


const PaymentModal = ({ isOpen, closeModal, orderId, amount, orderData }) => {
  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
   const { image, title, location, agentName, price, quantity, _id, status, propertyId } = orderData
   

  useEffect(()=>{
    axiosSecure.post('/create-payment-intent',{price})
    .then(res=>{
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure])


    const stripe = useStripe();
    const elements = useElements();
   

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error.message,
            });
            return;
        }

        // Proceed with server-side payment
        Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: `Payment for Order ID: ${orderId} of $${amount} was successful!`,
        });
        closeModal();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
                
                <form onSubmit={handlePayment}>
                    <CardElement className="border p-2 rounded mb-4" />
                    <button
                        type="submit"
                        className="w-full bg-lime-700 text-white py-2 px-4 rounded hover:bg-lime-900 transition duration-200"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay ${price}
                    </button>
                </form>
                <button
                    onClick={closeModal}
                    className="mt-4 w-full bg-red-600 opacity-75 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200"
                >
                    Close
                </button>
                
            </div>
        </div>
    ) : null;
};

export default PaymentModal;
