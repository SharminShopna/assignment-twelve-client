import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';

// ManageReviews component
const ManageReviews = () => {
    const queryClient = useQueryClient();

    // Fetch all reviews
    const { data: reviews, isLoading, isError, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/reviews');
            console.log(response.data);
            return response.data;
        }
    });

    // Handle delete review mutation
    const { mutate: handleDeleteReview } = useMutation({
        mutationFn: async (id) => {
          const token = localStorage.getItem('token');
      
          // Confirm before deleting
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this review!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          });
      
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(`http://localhost:5000/reviews/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
              
              // Handle success
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Review deleted successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              // Handle error
              if (error.response && error.response.data.message === 'You can only delete your own reviews or be an admin to delete any review') {
                Swal.fire({
                  icon: 'error',
                  title: 'Forbidden',
                  text: 'You can only delete your own reviews or be an admin to delete any review!',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops!',
                  text: 'Something went wrong! Please try again later.',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#FF5733',
                });
              }
              console.error(error.response ? error.response.data : error.message);
            }
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
      });
      

    if (isLoading) return <p><Loading /></p>;

    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Helmet>
        <title>House Box | Manage Review</title>
      </Helmet>
      <SectionTitle
        heading="Manage Reviews"
        subHeading="Seamlessly Handle User Reviews"
      />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="border rounded-lg p-4 flex flex-col items-center">
                        <div className="flex flex-col items-center mb-4">
                            <img src={review.image} alt="Reviewer" className="w-20 h-20 rounded-full mb-2" />
                            <div>
                                <h2 className="font-semibold text-center">{review.userName}</h2>
                                <p className="text-sm text-gray-500 text-center">{review.email}</p>
                            </div>
                        </div>
                        <p className="text-gray-800 text-center mb-4">"{review.reviewText}"</p>
                        <button
                            className="btn bg-red-600 text-white hover:bg-red-400 self-center mt-auto"
                            onClick={() => handleDeleteReview(review._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReviews;
