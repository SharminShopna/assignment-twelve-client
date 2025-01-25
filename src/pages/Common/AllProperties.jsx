import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Function to fetch properties


// All Properties Page Component
const AllProperties = () => {
    const fetchProperties = async () => {
        const response = await axios.get('http://localhost:5000/properties'); 
        return response.data;
      };
  const { data, error, isLoading } = useQuery('properties', fetchProperties);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {data.map((property) => (
        <div key={property._id} className="border rounded-lg shadow-lg overflow-hidden">
          <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <p className="font-bold text-lg">{`${property.minPrice} - ${property.maxPrice}`}</p>
            <p className="text-sm text-gray-500">Agent: {property.agent.name}</p>
            <p className="text-sm text-gray-500">Status: {property.status}</p>
            <div className="mt-4">
              <Link
                to={`/propDetails/${_id}`}
                className="btn text-white bg-lime-700 hover:bg-lime-900"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProperties;
