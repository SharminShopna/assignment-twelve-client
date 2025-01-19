import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const Wishlist = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch wishlist
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', user?.id],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`http://localhost:5000/wishlist/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
    });

    // Remove property from wishlist
    const removeFromWishlistMutation = useMutation({
        mutationFn: async (propertyId) => {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/wishlist/${user?.id}/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist']);
        },
    });

    const handleRemove = (propertyId) => {
        removeFromWishlistMutation.mutate(propertyId);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((property) => (
                <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">{property.title}</h3>
                        <p className="text-sm text-gray-500">{property.location}</p>
                        <p className="text-sm text-gray-500 mt-1">Price: {property.price}</p>
                        <p className="text-sm text-gray-500 mt-1">Agent: {property.agent?.name}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleRemove(property._id)}
                                className="btn bg-red-500 text-white hover:bg-red-700"
                            >
                                Remove
                            </button>
                            <button className="btn bg-blue-500 text-white hover:bg-blue-700">Make an Offer</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;
