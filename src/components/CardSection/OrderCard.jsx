import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import DeleteModal from "../Modal/DeleteModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PaymentModal from "../Modal/PaymentModal";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)


const OrderCard = ({ orderData, refetch }) => {
    let [isOpen, setIsOpen] = useState(false)
    let [isPaymentOpen, setIsPaymentOpen] = useState(false);
    let [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
    const closeModal = () => setIsOpen(false)
    const closePaymentModal = () => setIsPaymentOpen(false);

    const axiosSecure = useAxiosSecure()
    const { image, title, location, agentName, price, quantity, _id, status, propertyId } = orderData

    // handle order delete and cancel
    const handleDelete = async () => {
        try {
            //  fetch delete request
            await axiosSecure.delete(`/orders/${_id}`)

            // increase quantity from property collection
            await axiosSecure.patch(`/property/quantity/${propertyId}`, {
                quantityToUpdate: quantity,
                status: 'increase',
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Offer Order Cancelled",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.res.data || "An unexpected error occurred",
            });
        }
        finally {
            closeModal()
        }
    }

    return (
        <div>
            <div

                className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-600 flex items-center gap-1"><CiLocationOn /> {location}</p>
                    <p className="text-gray-800 mt-2">
                        <strong>Agent:</strong> {agentName}
                    </p>
                    <p className="text-gray-800">
                        <strong>Offered Amount:</strong> ${price}
                    </p>
                    <div
                        className={`mt-2 text-center font-semibold py-1 rounded ${status === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : status === 'accepted'
                                ? 'text-white bg-green-800'
                                : 'bg-lime-700 text-white'
                            }`}
                    >
                        {status}
                    </div>

                    <div className="flex gap-4 mt-1">
                        {status === "accepted" && (
                            <button
                            onClick={() => setIsPaymentOpen(true)}
                            disabled={isPaymentCompleted}
                            className={`mt-4 w-full py-2 px-4 rounded transition duration-200 ${
                                isPaymentCompleted
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-lime-700 text-white hover:bg-lime-900"
                            }`}
                        >
                            {isPaymentCompleted ? "Paid" : "Pay"}
                        </button>
                        )}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="mt-4 w-full text-white bg-red-700 hover:bg-red-800 py-2 px-4 rounded transition duration-200 bg-opacity-75 "
                        >
                            Cancel
                        </button>

                        <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal}></DeleteModal>

                    </div>

                </div>
            </div>
            {isPaymentOpen && (
                <Elements stripe={stripePromise}>
                    <PaymentModal isOpen={isPaymentOpen} refetch={refetch} closeModal={closePaymentModal} orderId={_id} onPaymentSuccess={() => setIsPaymentCompleted(true)} amount={price} orderData={orderData} />
                </Elements>
            )}
        </div>
    );
};

export default OrderCard;