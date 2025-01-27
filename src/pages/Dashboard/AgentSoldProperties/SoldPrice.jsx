import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading';
import { Navigate } from 'react-router-dom';
import PriceCard from './PriceCard';

const SoldPrice = () => {
    const [role, isLoading] = useRole()
    if (isLoading) return <Loading></Loading>
    if (role === 'customer') return <Navigate to='/dashboard/wishList' />
    if (role === 'admin') return <Navigate to='/dashboard/manageReviews' />
    return (
      <div>
        {role === 'agent' && <PriceCard></PriceCard>}
      </div>
    )
};

export default SoldPrice;