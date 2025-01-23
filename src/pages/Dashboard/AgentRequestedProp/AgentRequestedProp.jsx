import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaLocationArrow } from "react-icons/fa6";
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';
const AgentRequestedProp = () => {
  const queryClient = useQueryClient();

  // Fetch all offers data using the object form
  const { data: offers = [], isLoading, error } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/agent-offers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // console.log('agent-offer', response.data)
      return response.data;
    },
  });


  // Mutation for updating the status of an offer
  const updateOfferMutation = useMutation({
    mutationFn: async ({ _id: offerId, action }) => {
      const response = await axios.patch(
        `http://localhost:5000/agent-offers/${offerId}`,
        { status: action },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['offers']); 
    },
  });

  // Handle action (Accept or Reject)
  const handleAction = (offerId, action) => {
    updateOfferMutation.mutate({ _id: offerId, action });
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching offers: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>House Box | Requested Property</title>
      </Helmet>
      <SectionTitle heading="Requested Properties" subHeading=" Browse properties you've requested" />
      <div className="p-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-lime-700 text-white">
              <th className="border border-gray-300 p-2">Property Title</th>
              <th className="border border-gray-300 p-2 flex gap-1 items-center"><FaLocationArrow />Location</th>
              <th className="border border-gray-300 p-2">Buyer Name</th>
              <th className="border border-gray-300 p-2">Buyer Email</th>
              <th className="border border-gray-300 p-2">Offered Price</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="border border-gray-300 p-2">{offer.title}</td>
                <td className="border border-gray-300 p-2">{offer.location}</td>
                <td className="border border-gray-300 p-2">{offer.buyer.name}</td>
                <td className="border border-gray-300 p-2">{offer.buyer.email}</td>
                <td className="border border-gray-300 p-2">${offer.price}</td>
                <td
                  className={`border border-gray-300 p-2 font-semibold ${
                    offer.status === 'accepted'
                      ? 'text-green-600'
                      : offer.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-gray-500'
                  }`}
                >
                  {offer.status}
                </td>
                <td className="border border-gray-300 p-2">
                <button
                    className={`mr-2 p-2 rounded ${
                      offer.status === 'accepted'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white'
                    }`}
                    onClick={() => handleAction(offer._id, 'accepted')}
                    disabled={offer.status === 'accepted'} 
                  >
                    Accept
                  </button>
                  <button
                    className={`p-2 rounded ${
                      offer.status === 'rejected'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white'
                    }`}
                    onClick={() => handleAction(offer._id, 'rejected')}
                    disabled={offer.status === 'rejected'} 
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentRequestedProp;
