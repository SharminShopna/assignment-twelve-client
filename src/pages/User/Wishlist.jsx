import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';
import SectionTitle from '../../components/SectionTitle';
import { Helmet } from 'react-helmet';

const Wishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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
    removeFromWishlistMutation.mutate(propertyId);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>House Box | Wishlist</title>
      </Helmet>
      <div className=''>

      <SectionTitle heading="Your Wishlist" subHeading="Explore the properties you’ve saved for a future dream home" />


      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((property) => (
          <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-500">{property.location}</p>
              <p className="text-sm text-gray-500 mt-1">Price: {property.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleRemove(property._id)}
                  className="btn bg-red-600 text-white hover:bg-red-800"
                >
                  Remove
                </button>
                <button className="btn bg-lime-700 text-white hover:bg-lime-900">Make an Offer</button>
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
