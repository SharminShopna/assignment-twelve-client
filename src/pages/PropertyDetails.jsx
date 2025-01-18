import React from 'react';
import { Helmet } from 'react-helmet';
import SectionTitle from '../components/SectionTitle';

const PropertyDetails = () => {
    return (
        <>
        <Helmet>
        <title>House Box | Property Details</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
        <div className='mt-32 my-4'>
        <SectionTitle
                heading="Property Details"
                subHeading="Detailed insights on location and features"
            ></SectionTitle>

        </div>
           <h1>Details</h1> 
        </>
    );
};

export default PropertyDetails;