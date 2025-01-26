
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import SectionTitle from '../../components/SectionTitle';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import { MdOutlinePreview } from 'react-icons/md';

const MyReviews = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch user's reviews
    const { data: reviews, isLoading } = useQuery({
        queryKey: ['myReviews', user.email],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(
                `http://localhost:5000/my-reviews/${user.email}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(data)
            return data;
            
        },
    });

    // Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: async (id) => {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/reviews/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Review deleted successfully!',
                timer: 1500,
                showConfirmButton: false,
            });
            queryClient.invalidateQueries(['myReviews', user.email]);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReviewMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <p><Loading></Loading></p>;

    return (
        <>
        <Helmet>
        <title>House Box | My Reviews</title>
      </Helmet>
      <div className="">
        <SectionTitle
          heading="My Reviews"
          subHeading="Here’s a list of reviews you’ve shared for properties."
        />
        <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="p-4 border rounded shadow">
                        <h2 className="font-bold text-lg">{review.propertyTitle}</h2>
                        <p className='flex items-center gap-1'><MdOutlinePreview />{review.reviewText}</p>
                        <p>Agent: {review?.property?.agent?.name || 'fahim'}</p>
                        <p>Time: {new Date(review.time).toLocaleString()}</p>
                        
                        <button
                            className="btn bg-red-600 text-white hover:bg-red-400 mt-2"
                            onClick={() => handleDelete(review._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </div>
        </>
    );
};

export default MyReviews;