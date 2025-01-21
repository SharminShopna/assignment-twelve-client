import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import DeleteModal from "../Modal/DeleteModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const OrderCard = ({ orderData, refetch }) => {
    let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure()
    const { image, title, location, agentName, price, quantity, _id, status, propertyId } = orderData

    // handle order delete and cancel
    const handleDelete = async()=>{
        try{
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
        catch(err){
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.res.data || "An unexpected error occurred",
            });
        }
        finally{
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
                    <p className="text-gray-800">
                        <strong>Quantity:</strong> {quantity}
                    </p>
                    <div
                        className={`mt-2 text-center font-semibold py-1 rounded ${status === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : status === 'approved'
                                ? 'text-white bg-green-800'
                                : 'bg-lime-700 text-white'
                            }`}
                    >
                        {status}
                    </div>

                    <div className="flex gap-4 mt-1">
                        {status === "approved" && (
                            <button
                                onClick={() => handlePayment(_id)}
                                className="mt-4 w-full bg-lime-700 text-white py-2 px-4 rounded hover:bg-lime-900 transition duration-200"
                            >
                                Pay
                            </button>
                        )}
                           <button onClick={() => setIsOpen(true)}
                        className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-white leading-tight'
                    >
                        <span className='absolute cursor-pointer inset-0 bg-red-700 opacity-50 rounded-full'></span>
                        <span className='relative cursor-pointer'>Cancel</span>
                    </button>
                    <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal}></DeleteModal> 

                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default OrderCard;