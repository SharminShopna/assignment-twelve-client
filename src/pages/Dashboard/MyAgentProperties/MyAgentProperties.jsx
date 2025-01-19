import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../../components/Loading';

function MyAgentProperties() {
  // Fetch properties using TanStack Query (v5+)
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      // Ensure the token exists in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      // Send request to fetch properties
      const response = await axios.get('http://localhost:5000/propertySection', {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the header
        },
      });

      return response.data;
    },
  });

  // Loading state
  if (isLoading) {
    return <div><Loading /></div>;
  }

  // Error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // If there are no properties, show a message
  if (!properties || properties.length === 0) {
    return <div>No properties available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property._id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{property.title}</h2>
            <p className="text-gray-700 text-base">{property.location}</p>
            <p className="text-gray-500 text-sm">Agent: {property.agentName}</p>
            <p className="text-gray-500 text-sm">Price Range: ${property.minPrice} - ${property.maxPrice}</p>
            <p className={`text-sm ${property.verificationStatus === 'verified' ? 'text-green-500' : property.verificationStatus === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
              Status: {property.verificationStatus}
            </p>
          </div>
          <div className="px-6 py-4 flex justify-between">
            {property.verificationStatus !== 'rejected' && (
              <button className="text-lime-700 hover:text-lime-900">Update</button>
            )}
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyAgentProperties;
