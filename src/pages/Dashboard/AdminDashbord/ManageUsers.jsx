import React from 'react';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ManageUsers = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-users/${user?.email}`);
            return data;
        },
    });

    console.log(users);

    return (
        <>
            <Helmet>
                <title>House Box | Manage User</title>
                <meta name="description" content="Add a new property to the system" />
            </Helmet>
            <SectionTitle
                heading="Manage Users"
                subHeading="Control user accounts, roles, and activities"
            ></SectionTitle>

            <div className="overflow-x-auto mt-6">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-lime-700 text-white">
                            <th className="border border-gray-300 px-4 py-2">USER NAME</th>
                            <th className="border border-gray-300 px-4 py-2">EMAIL</th>
                            <th className="border border-gray-300 px-4 py-2">ROLE</th>
                            <th className="border border-gray-300 px-4 py-2">STATUS</th>
                            <th className="border border-gray-300 px-4 py-2">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((userData) => (
                            <tr key={userData.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{userData.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{userData.email}</td>
                                <td
                                    className={`border border-gray-300 px-4 py-2 ${
                                        userData.role === 'agent'
                                        ? 'text-yellow-600'
                                        : userData.role === 'admin'
                                        ? 'text-green-600'
                                        : 'text-gray-600'
                                    }`}
                                >
                                    {userData.role}
                                </td>
                                <td className="border text-red-600 border-gray-300 px-4 py-2">
                                    {userData?.status? (
                                        <p
                                            className={`${userData?.status === 'Requested' ? 'text-yellow-600' : 'text-green-600'
                                                } whitespace-no-wrap`}
                                        >
                                            {userData?.status}
                                        </p>
                                    ) : (
                                        <p className='text-red-600'>Unavailable</p>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <div className="relative inline-block text-left">
                                        <button
                                            className="bg-lime-500 text-white px-3 py-1 rounded-xl hover:bg-gray-600"
                                            type="button"
                                            aria-haspopup="true"
                                            aria-expanded="true"
                                            onClick={(e) => {
                                                const dropdown = e.currentTarget.nextSibling;
                                                dropdown.classList.toggle('hidden');
                                            }}
                                        >
                                            Actions
                                        </button>
                                        <div className="hidden origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                                <button
                                                    data-action="make-admin"
                                                    data-user-id={userData.id}
                                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-white hover:bg-lime-700"
                                                    role="menuitem"
                                                >
                                                    Make Admin
                                                </button>
                                                <button
                                                    data-action="make-agent"
                                                    data-user-id={userData.id}
                                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-white hover:bg-lime-700"
                                                    role="menuitem"
                                                >
                                                    Make Agent
                                                </button>
                                                {userData.role === 'agent' && (
                                                    <button
                                                        data-action="mark-fraud"
                                                        data-user-id={userData.id}
                                                        className="block w-full px-4 py-2 text-sm text-left hover:text-white text-gray-700 hover:bg-lime-700"
                                                        role="menuitem"
                                                    >
                                                        Mark as Fraud
                                                    </button>
                                                )}
                                                <button
                                                    data-action="delete-user"
                                                    data-user-id={userData.id}
                                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-white hover:bg-lime-700"
                                                    role="menuitem"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No users found.</p>
                )}
            </div>
        </>
    );
};

export default ManageUsers;
