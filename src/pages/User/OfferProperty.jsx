import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../components/Loading';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../components/SectionTitle';

const OfferProperty = () => {
    // Fetch all offers data using the object form
    const { data: offers = [], isLoading, error } = useQuery({
        queryKey: ['offers'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/agent-offers', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return response.data;
        },
    });

    if (isLoading) return <div><Loading></Loading></div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Helmet>
                <title>House Box | My Offer</title>
                <meta name="description" content="Add a new property to the system" />
            </Helmet>
            <SectionTitle
                heading="My Offers"
                subHeading="My Offer Property"
            ></SectionTitle>


            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Offers</h2>
                <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="border p-4 rounded-lg shadow-lg"
                        >
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-40 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-lg font-semibold">{offer.title}</h3>
                            <p className="text-sm text-gray-600">Location: {offer.location}</p>
                            <p className="text-sm text-gray-600">Agent: {offer?.agent?.name || 'Fahim'}</p>
                            <p className="text-sm text-gray-600">Offered Amount: ${offer.price}</p>
                            <div className="mt-2">
                                <p
                                    className={`text-sm font-medium ${offer.status === 'accepted'
                                            ? 'text-green-600'
                                            : offer.status === 'rejected'
                                                ? 'text-red-600'
                                                : 'text-yellow-500'
                                        }`}
                                >
                                    Status: {offer.status}
                                </p>
                                {offer.status === 'bought' && (
                                    <p className="text-sm text-green-600 dark:text-green-400">Transaction ID: {offer.transactionId}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OfferProperty;
