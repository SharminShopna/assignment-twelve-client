import React from 'react';
import Loading from '../../../components/Loading';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AgentOrderDataRow from '../../../components/Table/AgentOrderDataRow';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';
import SoldPrice from './SoldPrice';

const AgentSoldProperties = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`http://localhost:5000/agent-orders/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // console.log(data)
      return data;
    },
  })
  // console.log('Fetched Orders:', orders);

  // console.log(orders)
  if (isLoading) return <Loading></Loading>
  return (
    <>
      <Helmet>
        <title>House Box | Sold Property</title>
        <meta name="description" content="Add a new property to the system" />
      </Helmet>
      {/* Title */}
      <SectionTitle
        heading="My Sold Property"
        subHeading="Details Of All Sold Properties."
      ></SectionTitle>
      {/* sold card length */}
      <div className='mt-12'>
      <SoldPrice></SoldPrice>
      </div>
      {/* sold property details */}
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Property Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {orders
                  .filter(orderData => orderData.status !== 'Pending' && orderData.status !== 'rejected')
                    .map(orderData => (
                      <AgentOrderDataRow
                        key={orderData?._id}
                        orderData={orderData}
                        refetch={refetch}
                      />
                    ))}
                </tbody>


              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentSoldProperties;