import React from 'react';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';

const ManageUsers = () => {
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

        </>
    );
};

export default ManageUsers;