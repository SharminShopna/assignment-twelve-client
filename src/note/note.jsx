import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PropBought = () => {
  const userId = 'user-id'; // Replace with the actual logged-in user's ID or fetch from context

  // Fetch bought properties
  const { data: boughtProperties = [], isLoading, error } = useQuery({
    queryKey: ['boughtProperties', userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/bought/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt-token')}`, // Include the JWT token
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Properties Bought</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boughtProperties.length > 0 ? (
          boughtProperties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-800 mt-2">
                  <strong>Agent:</strong> {property.agentName}
                </p>
                <p className="text-gray-800">
                  <strong>Offered Amount:</strong> ${property.offeredAmount}
                </p>
                <div
                  className={`mt-4 text-center font-semibold py-1 rounded ${
                    property.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : property.status === 'approved'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {property.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            You have not bought any properties yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropBought;
