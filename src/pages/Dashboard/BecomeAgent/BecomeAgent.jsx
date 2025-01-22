import React, { useState, useEffect } from 'react';
import BecomeAgentModal from '../../../components/Modal/BecomeAgentModal';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const BecomeAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userStatus, setUserStatus] = useState(""); 
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const { data } = await axiosSecure.get(`/users/status/${user?.email}`);
                setUserStatus(data.status); 
            } catch (err) {
                console.error("Failed to fetch user status:", err.response?.data || err.message);
            }
        };
        if (user?.email) fetchUserStatus();
    }, [axiosSecure, user?.email]);

    const requestHandler = async () => {
        if (userStatus === "Request") {
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "You have already applied. Please wait for approval.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            // Send request to server
            const { data } = await axiosSecure.patch(`/users/${user?.email}`);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Applied to become an agent",
                showConfirmButton: false,
                timer: 1500,
            });

            setUserStatus("Request");
        } catch (err) {
            console.error(err.response?.data || err.message);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to Apply",
                text: err.response?.data || "Something went wrong. Please try again later.",
                showConfirmButton: true,
            });
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <Helmet>
                <title>House Box | Become Agent</title>
            </Helmet>

            <SectionTitle 
                heading="Become an Agent" 
                subHeading="Your Journey Starts Here" 
            />

            <div className='flex justify-center items-center'>
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn flex items-center justify-center px-6 py-3 mt-5 transition-colors duration-300 transform bg-lime-600 hover:bg-lime-700 text-white font-medium rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                >
                    Become An Agent
                </button>
            </div>

            {/* Modal component */}
            <BecomeAgentModal
                requestHandler={requestHandler}
                closeModal={closeModal}
                isOpen={isOpen}
            />
        </>
    );
};

export default BecomeAgent;
