import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';
import SectionTitle from '../../components/SectionTitle';
import { Helmet } from 'react-helmet';
import {  useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';

const Wishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch wishlist
  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.uid],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('JWT token is missing');

      const { data } = await axios.get(`http://localhost:5000/wishlist/${user?.uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    onError: (error) => {
      console.error('Error fetching wishlist:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load wishlist. Please try again later.',
      });
    },
  });

  // Remove property from wishlist
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (propertyId) => {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/wishlist/${user?.uid}/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Property removed from wishlist!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error('Error removing property from wishlist:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to remove property. Please try again.',
      });
    },
  });

  const handleRemove = (propertyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromWishlistMutation.mutate(propertyId, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The property has been removed from your wishlist.",
              icon: "success"
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong, please try again.",
              icon: "error"
            });
          }
        });
      }
    });
  };


  const handleMakeOffer = (property) => {
    navigate('/dashboard/makeOffer', { state: { property } });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>House Box | Wishlist</title>
      </Helmet>
      <div>
        <SectionTitle heading="Your Wishlist" subHeading="Explore the properties you’ve saved for a future dream home" />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((property) => (
            <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={property?.image} alt={property.title} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-sm text-gray-500 flex gap-1 items-center"><CiLocationOn />{property.location}</p>
                <p className="text-sm text-gray-500 mt-1">Price: {property.minPrice} - {property.maxPrice}</p>
                <div className="flex items-center mt-3">
                  <img src={property?.agent?.image} alt={property?.agent?.name} className="w-8 h-8 rounded-full mr-2" />
                  <p className="text-sm font-medium">{property?.agent?.name}</p>
                </div>
                <p className={`mt-2 text-sm font-medium ${property.verificationStatus ? 'text-green-600' : 'text-red-600'}`}>
                  {property.verificationStatus ? 'Verified' : 'Not Verified'}
                </p>
                <div className="flex justify-between gap-1 mt-4">
                  <button
                    onClick={() => handleRemove(property._id)}
                    className="btn bg-red-600 text-white hover:bg-red-800"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleMakeOffer(property)}
                    className="btn bg-lime-700 text-white hover:bg-lime-900"
                  >
                    Make an Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
