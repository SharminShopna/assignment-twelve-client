import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import DeleteModal from '../Modal/DeleteModal';

const AgentOrderDataRow = ({ orderData, refetch }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure()
  const { title, status, quantity, price, location, buyer, _id } = orderData || {}

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
        text: err.response?.data?.message || "An unexpected error occurred",
      });
    }
    finally {
      closeModal()
    }
  }

  // handle status change
  const handleStatus = async (newStatus) => {
    if (status === newStatus) return
    //  console.log(newStatus)

    try {
      //update order status
      await axiosSecure.patch(`/orders/${_id}`, {
        status: newStatus
      })
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
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
        text: err.response?.data?.message || "Status not Updated",
      });
    }

  }


  return (
    <>
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{title}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{buyer.name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{buyer.email}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{location}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <div className='flex items-center gap-2'>
            {status === 'accepted' ? (
              <select
                required
                defaultValue={status}
                onChange={(e) => handleStatus(e.target.value)}
                disabled={status === 'Sold'}
                className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
                name='category'
              >
                <option value='Accepted'>Accepted</option>
                <option value='In Progress'>Start Processing</option>
                <option value='Sold'>Sold</option>
              </select>
            ) : status === 'Pending' ? (
              <p className='text-gray-600 italic'>Wait Property Pending</p>
            ) : status === 'rejected' ? (
              <p className='text-red-600 italic font-semibold'>Property Rejected</p>
            ) : null}
            <button
              onClick={() => setIsOpen(true)}
              className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
              ></span>
              <span className='relative'>Cancel</span>
            </button>
          </div>
          <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal} />
        </td>

      </tr>
    </>
  );
};

export default AgentOrderDataRow;