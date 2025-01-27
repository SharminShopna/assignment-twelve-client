import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa6';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';

const PriceCard = () => {
    const axiosSecure = useAxiosSecure()
    // fetch stat data from server
    const { data: statData, isLoading } = useQuery({
        queryKey: ['agent-stat'],
        queryFn: async () => {
            const { data } = await axiosSecure('/agent-stat')
            return data
        },
    })
    const { totalProperty, totalPrice, totalOrder } = statData || {}
    // console.log(statData); 

    if (isLoading) return <Loading></Loading>
    return (
        <>
            <div>
                <div className='mt-12'>
                    {/* small cards */}
                    <div className='mb-12 grid gap-y-10 gap-x-16 md:grid-cols-3 lg:grid-cols-3 flex-grow'>
                        {/* Sold Price Card */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                            >
                                <FaDollarSign className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-4 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Sold Amount
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                     ${totalPrice || 0} 
                                </h4>
                            </div>
                        </div>
                        {/* Total Order */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
                            >

                                <BsFillCartPlusFill className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-4 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Sold Property
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                     {totalOrder || 0} 
                                </h4>
                            </div>
                        </div>
                        {/* Total Property */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                            >
                                <BsFillHouseDoorFill className='w-6 h-6 text-white' />

                            </div>
                            <div className='p-4 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Plants
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                    {totalProperty || 0}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceCard;