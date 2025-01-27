const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)),
});

// Delete user from Firebase Auth
app.delete('/user/:email', verifyToken, async (req, res) => {
    const email = req.params.email;

    try {
        // Fetch the Firebase user by email
        const userRecord = await admin.auth().getUserByEmail(email);

        // Delete the Firebase user
        await admin.auth().deleteUser(userRecord.uid);

        // Delete the user from the database
        const query = { email };
        const result = await usersCollection.deleteOne(query);

        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to delete user' });
    }
});


// Delete a user from the database and Firebase
app.delete('/user/:email', verifyToken, async (req, res) => {
  const email = req.params.email;

  try {
      // Delete user from database
      const query = { email };
      const result = await usersCollection.deleteOne(query);

      if (result.deletedCount === 0) {
          return res.status(404).send({ message: 'User not found' });
      }

      // Delete user from Firebase (if applicable)
      // Call Firebase Admin SDK here (optional if Firebase integration is used)

      res.send({ message: 'User deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Failed to delete user' });
  }
});

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
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-users/${user?.email}`);
            return data;
        },
    });

    // Handle user role update
    const updateRole = async (selectedRole, userEmail) => {
        if (users.role === selectedRole) return;

        try {
            await axiosSecure.patch(`/user/role/${userEmail}`, {
                role: selectedRole,
            });
            Swal.fire({
                title: 'Good job!',
                text: 'Role updated successfully!',
                icon: 'success',
            });
            refetch();
        } catch (err) {
            Swal.fire({
                title: 'Oops!',
                text: err.response?.data?.message || 'Something went wrong!',
                icon: 'error',
            });
        } finally {
            setIsOpen(false);
        }
    };

    // Handle user deletion
    const deleteUser = async (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/user/${email}`);
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    refetch();
                } catch (err) {
                    Swal.fire({
                        title: 'Error!',
                        text: err.response?.data?.message || 'Something went wrong!',
                        icon: 'error',
                    });
                }
            }
        });
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <>
            <Helmet>
                <title>House Box | Manage User</title>
                <meta name="description" content="Add a new property to the system" />
            </Helmet>
            <SectionTitle heading="Manage Users" subHeading="Control user accounts, roles, and activities"></SectionTitle>

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
                                <td className="border border-gray-300 px-4 py-2">
                                    {userData.role}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {userData?.status || 'Unavailable'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => {
                                            setUserEmail(userData.email);
                                            setIsOpen(true);
                                        }}
                                        className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
                                    >
                                        Update Role
                                    </button>
                                    <button
                                        onClick={() => deleteUser(userData.email)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                    <UpdateUserModal
                                        updateRole={updateRole}
                                        role={userData.role}
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
