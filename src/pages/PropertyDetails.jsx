import SectionTitle from '../components/SectionTitle';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MdOutlineDescription } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch property details
    const { data: property, isLoading } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/properties/${id}`);
            return data;
        },
    });

    // Add property to wishlist
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
                location: property.location,
                userImage: user.photoURL, 
                price: property.price,
              }, 
             {
                 headers: {
                     Authorization: `Bearer ${token}`,
                 },
             }
         );
         return response.data;
     },
     onSuccess: () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Property added to wishlist!",
            showConfirmButton: false,
            timer: 1500
          });
          queryClient.invalidateQueries(['wishlist']);  
     },
     onError: (error) => {
         console.error('Error adding property to wishlist:', error.message);
         if (error.response?.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You are not authorized. Please log in again.",
              });
            //  alert('You are not authorized. Please log in again.');
             navigate('/login'); 
         } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Already add property to wishlist",
              });
         }
     },
 });

 const handleAddToWishlist = () => {
     if (user) {
         addToWishlistMutation.mutate();
     } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You must be logged in to add to wishlist.",
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
                    <div className="flex-1">
                        <img className="w-full rounded-lg" src={property.image} alt={property.title} />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                        <p className="text-lg flex gap-2 text-gray-600 mb-4">
                            <MdOutlineDescription size={52} />
                            {property.description}
                        </p>
                        <p className="text-2xl flex gap-2 items-center font-semibold text-gray-800 mb-4">
                            Price: <FaDollarSign />
                            {property.price}
                        </p>
                        <div className="text-2xl flex gap-2 items-center font-semibold text-gray-800 mb-4"><IoLocationOutline /> {property.location}</div>
                        <p className="text-lg text-gray-500 mb-4">Agent: {property.agent?.name}</p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToWishlist}
                                className="btn bg-lime-700 text-white hover:bg-lime-900"
                            >
                                Add To Wishlist
                            </button>
                            <button className="btn bg-lime-700 text-white hover:bg-lime-900">Add a Review</button>
                            <Link to="/" className="btn bg-lime-700 text-white hover:bg-lime-900">Go Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
