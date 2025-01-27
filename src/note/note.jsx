import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentModal = ({ isOpen, closeModal, orderId, amount, orderData }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const { price } = orderData;

  useEffect(() => {
    getPaymentIntent()

  }, [ price]);
  console.log(clientSecret,'get payment intent')

  const getPaymentIntent = async()=>{
    try{
        const {data} = await axiosSecure.post("/create-payment-intent", {
             price ,
            })
            setClientSecret(data.clientSecret)
    } catch (err){
        console.log(err)
    }
  }

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (paymentError) {
      console.error(paymentError);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: paymentError.message,
      });
    } else{
        console.log('[paymentMethod]',paymentMethod)
    }

    try {
    //   const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: paymentMethod.id,
        

    //   });

    //   if (confirmError) {
    //     console.error("Payment confirmation error:", confirmError);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Payment Error",
    //       text: confirmError.message,
    //     });
    //     return;
    //   }

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Payment for Order ID: ${orderId} of $${amount} was successful!`,
      });

      // TODO: Send payment details to your server
      const data = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: {
               name: user?.displayName,
               email:user?.email,
            },
        },
      })
      console.log(data);




      closeModal();
    } catch (error) {
      console.error("Payment processing error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message,
      });
    }
     
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




// const {paymentIntent, error: confirmError} = await stripe.createPaymentMethod(clientSecret, {
//     payment_method: {
//         card:cardElement,
//         billing_details: {
//             email: user?.email || 'anonymous',
//             name: user?.displayName || 'anonymous',
//         }
//     }
// })


// const {paymentIntent, error: confirmError} = await stripe.createPaymentMethod(clientSecret, {
//     payment_method: {
//         card:cardElement,
//         billing_details: {
//             email: user?.email || 'anonymous',
//             name: user?.displayName || 'anonymous',
//         }
//     }
// })

  //   closeModal()