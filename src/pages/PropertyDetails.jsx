import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MdOutlineDescription } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    // console.log(user?.displayName); 
    const queryClient = useQueryClient();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);

    // Fetch property details
    const { data: property, isLoading, refetch } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/properties/${id}`);
            return data;
        },
    });

    // Add to wishlist mutation
    const addToWishlistMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('JWT token is missing');

            const response = await axios.post(
                'http://localhost:5000/wishlist',
                {
                    userId: user.uid,
                    userName: user.displayName,
                    propertyId: property._id,
                    image: property.image,
                    title: property.title,
                    status: property.status,
                    location: property.location,
                    userImage: user.photoURL,
                    maxPrice: property.maxPrice,
                    minPrice: property.minPrice,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        },
        onSuccess: () => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Property added to wishlist!',
                showConfirmButton: false,
                timer: 1500,
            });
            queryClient.invalidateQueries(['wishlist']);
            navigate('/dashboard/wishList')
            // navigate('/dashboard/wishList', { state: { property, refetch } })
        },
        onError: (error) => {
            if (error.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized!',
                    text: 'Please log in to add to wishlist.',
                });
                navigate('/login');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Property already in wishlist.',
                });
            }
        },
    });

    // Add review mutation
    const addReviewMutation = useMutation({
        mutationFn: async () => {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('JWT token is missing');
          const review =  {
            propertyId: id, // Ensure propertyId is sent
            reviewText,
            rating,
            title: property,
            userName: user.displayName || 'Anika',
            image: user.photoURL || 'Anika',
            email: user.email || 'Anika',
          }
          const response = await axios.post(
            'http://localhost:5000/reviews',review,
           
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return response.data;
        },
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Review added successfully!',
            timer: 1500,
            showConfirmButton: false,
          });
          setIsReviewModalOpen(false);
          queryClient.invalidateQueries(['reviews', id]);
        },
        onError: () => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add review!',
            text: 'Please try again.',
          });
        },
      });
      

    // Handlers
    const handleAddToWishlist = () => {
        if (user) {
            addToWishlistMutation.mutate();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Required!',
                text: 'You must log in to add a property to your wishlist.',
            });
            navigate('/login');
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="mt-32 my-4">
            <Helmet>
                <title>House Box | Property Description</title>
            </Helmet>

            <SectionTitle heading="Property Details" subHeading="Detailed insights on location and features" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Property Image */}
                    <div className="flex-1">
                        <img className="w-full rounded-lg" src={property.image} alt={property.title} />
                    </div>

                    {/* Property Details */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                        <p className="text-lg flex gap-2 text-gray-600 mb-4">
                            <MdOutlineDescription size={24} /> {property.description}
                        </p>
                        <p className="text-2xl flex gap-1 items-center font-semibold text-gray-800 mb-4">
                            Price: {property.minPrice} - {property.maxPrice}<FaDollarSign />
                        </p>
                        <p className="text-2xl flex gap-2 items-center font-semibold text-gray-800 mb-4">
                            Quantity: {property?.quantity || '0'} 
                        </p>
                        <div className="text-2xl flex gap-1 items-center font-semibold text-gray-800 mb-4">
                        Location: {property.location}<IoLocationOutline />
                        </div>
                        <p className="text-lg text-gray-500 mb-4">Agent: {property.agent?.name}</p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToWishlist}
                                className="btn bg-lime-700 text-white hover:bg-lime-900"
                            >
                                Add To Wishlist
                            </button>
                            <button
                                onClick={() => setIsReviewModalOpen(true)}
                                className="btn bg-lime-700 text-white hover:bg-lime-900"
                            >
                                Add a Review
                            </button>
                            <Link to="/allProperties" className="btn bg-lime-700 text-white hover:bg-lime-900">
                                Go All Property 
                            </Link>
                        </div>

                        {/* Review Modal */}
                        {isReviewModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                <div className="modal-box bg-white p-6 rounded-lg w-11/12 max-w-lg">
                                    <h2 className="font-bold text-lg">Add a Review</h2>
                                    <p className='font-semibold text-lime-700'>userName: {user.displayName}</p>
                                    <textarea
                                        className="textarea textarea-bordered w-full mt-4"
                                        placeholder="Write your review here..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    />
                                    <div className="mt-4">
                                        <label className="font-bold">Rating:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            className="input input-bordered ml-2 w-16"
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="modal-action mt-4">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => addReviewMutation.mutate()}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => setIsReviewModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
