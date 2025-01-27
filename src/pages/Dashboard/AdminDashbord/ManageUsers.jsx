import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import UpdateUserModal from '../../../components/Modal/UpdateUserModal';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false)
    const [userEmail,setUserEmail] = useState('')
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-users/${user?.email}`);
            return data;
        },
    });
    // console.log(users);

    // handle user role update
    const updateRole = async (selectedRole, userEmail) => {
        if (users.role === selectedRole) return; 
      
        try {
           await axiosSecure.patch(`/user/role/${userEmail}`, {
            role: selectedRole,
          });
          Swal.fire({
            title: "Good job!",
            text: "Role updated successfully!",
            icon: "success"
          });
        //   console.log(data);
          refetch()
        } catch (err) {
            Swal.fire({
                title: "Oops!",
                text: err.response?.data?.message || "Something went wrong!",
                icon: "error",
              });
        //   console.error(err);
        } finally{
            setIsOpen(false)
        }
      };

    if(isLoading) return <Loading></Loading>

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
                                    className={`border border-gray-300 px-4 py-2 ${userData.role === 'agent'
                                            ? 'text-yellow-600'
                                            : userData.role === 'admin'
                                                ? 'text-green-600'
                                                : 'text-gray-600'
                                        }`}
                                >
                                    {userData.role}
                                </td>
                                <td className="border text-red-600 border-gray-300 px-4 py-2">
                                    {userData?.status ? (
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
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <span
                                        onClick={() =>{setUserEmail(userData?.email)
                                             setIsOpen(true)}}
                                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                    >
                                        <span
                                            aria-hidden='true'
                                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                                        ></span>
                                        <span className='relative'>Update Role</span>
                                    </span>
                                    <button className='px-4 py-1 font-bold bg-red-300 text-gray-700 rounded-full ml-4'>Delete</button>
                                    {/* Modal */}
                                    <UpdateUserModal
                                         updateRole={updateRole}
                                        role={userData?.role}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        userEmail={userEmail}
                                    />
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
