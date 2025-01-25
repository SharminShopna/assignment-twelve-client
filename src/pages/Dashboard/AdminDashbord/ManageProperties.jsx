import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';


const ManageProperties = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const { data: properties, isLoading, error, isError } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure('/propertiesData');
                return data;
            } catch (err) {
                console.error('Error fetching properties:', err);
                throw err;
            }
        },
    });

    // Mutation for verifying a property
    const verifyMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/properties-verify/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['property'] });
            Swal.fire({
                icon: 'success',
                title: 'Verified!',
                text: 'The property has been successfully verified.',
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to verify the property.',
            });
        },
    });

    // Mutation for rejecting a property
    const rejectMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/properties-reject/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['property'] });
            Swal.fire({
                icon: 'success',
                title: 'Rejected!',
                text: 'The property has been successfully rejected.',
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to reject the property.',
            });
        },
    });

    // Handle property verification
    const handleVerify = (id) => {
        verifyMutation.mutate(id);
    };

    // Handle property rejection
    const handleReject = (id) => {
        rejectMutation.mutate(id);
    };

    if (isLoading) {
        return <div><Loading></Loading></div>;
    }

    if (isError) {
        return <div>Error fetching properties: {error.message}</div>;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'verified':
                return 'text-green-600';
            case 'rejected':
                return 'text-red-600';
            case 'pending':
            default:
                return 'text-yellow-500';
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Agent Name</th>
                        <th className="border px-4 py-2">Agent Email</th>
                        <th className="border px-4 py-2">Price Range</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td className="border px-4 py-2">{property?.title}</td>
                            <td className="border px-4 py-2">{property?.location}</td>
                            <td className="border px-4 py-2">{property.agent?.name}</td>
                            <td className="border px-4 py-2">{property.agent?.email}</td>
                            <td className="border px-4 py-2">
                                {property.minPrice} - {property.maxPrice}
                            </td>
                            <td className="border px-4 py-2">
                                <span className={getStatusClass(property.status)}>
                                    {property.status === 'verified'
                                        ? 'Verified'
                                        : property.status === 'rejected'
                                        ? 'Rejected'
                                        : 'Pending'}
                                </span>
                            </td>
                            <td className="border px-4 py-2">
                                {property.status !== 'verified' && property.status !== 'rejected' ? (
                                    <>
                                        <button
                                            className="bg-green-600 rounded-lg text-white px-2 py-1 mr-2"
                                            onClick={() => handleVerify(property._id)}
                                            disabled={verifyMutation.isLoading}
                                        >
                                            {verifyMutation.isLoading && verifyMutation.variables === property._id
                                                ? 'Verifying...'
                                                : 'Verify'}
                                        </button>
                                        <button
                                            className="bg-red-600 rounded-lg text-white px-2 py-1"
                                            onClick={() => handleReject(property._id)}
                                            disabled={rejectMutation.isLoading}
                                        >
                                            {rejectMutation.isLoading && rejectMutation.variables === property._id
                                                ? 'Rejecting...'
                                                : 'Reject'}
                                        </button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProperties;
