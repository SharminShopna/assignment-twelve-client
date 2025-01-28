import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import SectionTitle from '../../../components/SectionTitle';
import { Helmet } from 'react-helmet';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdvertiseProperty = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure()

    // Fetch admin-verified properties
    const { data: properties, isLoading } = useQuery({
        queryKey: ['adminVerifiedProperties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('https://assignment-twelve-server-drab.vercel.app/admin-verified-properties');
            console.log(data)
            return data;
        },
    });

    // Mutation to advertise a property
    const advertiseMutation = useMutation({
        mutationFn: async (propertyId) => {
            const response = await axios.post('https://assignment-twelve-server-drab.vercel.app/advertise-property', { propertyId });
            return response.data;
        },
        onSuccess: (data) => {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data.message || 'Property advertised successfully!',
                confirmButtonColor: '#3085d6',
            });
            queryClient.invalidateQueries(['adminVerifiedProperties']);
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to advertise the property.',
                confirmButtonColor: '#d33',
            });
        },
    });

    if (isLoading) {
        return (
            <div>
                <Loading></Loading>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>House Box | Advertise Property</title>
                <meta name="description" content="Add a new property to the system" />
            </Helmet>
            <SectionTitle
                heading="Advertise Properties"
                subHeading="Showcase Verified Listings to Attract Buyers"
            ></SectionTitle>

            <div className="p-5">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-lime-50">
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Agent</th>
                                <th className="border border-gray-300 px-4 py-2">Price Range</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property) => (
                                <tr key={property._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{property?.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{property?.agent?.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ${property?.minPrice} - {property?.maxPrice}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => advertiseMutation.mutate(property?._id)}
                                            className="bg-lime-700 text-white px-4 py-2 rounded hover:bg-lime-500"
                                        >
                                            Advertise
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdvertiseProperty;
