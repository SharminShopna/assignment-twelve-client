import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../components/SectionTitle';
import OrderCard from '../../components/CardSection/OrderCard';

const PropBought = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`http://localhost:5000/buyer-orders/${user?.email}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                  },
            });
            console.log(data)
            return data;
        },
    })

    // console.log(orders)
    if (isLoading) return <Loading></Loading>
    return (
        <>
            <Helmet>
                <title>House Box | Bought Property</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <SectionTitle heading="Properties Purchased" subHeading="My successful purchases list" />
                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {orders.length > 0 ? (
                        orders.map((orderData) => (<OrderCard key={orderData._id} orderData={orderData} refetch={refetch}></OrderCard>   
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">
                            You have not bought any properties yet.
                        </p>
                    )}
                </div> 
            </div>
        </>
    );
};

export default PropBought;