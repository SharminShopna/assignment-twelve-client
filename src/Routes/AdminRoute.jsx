import React from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useRole from '../hooks/useRole';
const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return children;
    }
    return (
        <Navigate to={"/dashboard"} replace='true'>

        </Navigate>
    );
};

export default AdminRoute;