import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../components/Loading';
import AdvCard from '../../components/CardSection/AdvCard';

const Advertisement = () => {
    const {data:properties, isLoading} = useQuery({
        queryKey:['property'],
        queryFn: async() =>{
            const {data} = await axios('http://localhost:5000/properties')
            return data
        },
    })
    if(isLoading) return <Loading></Loading>
    return (
        <>
         <SectionTitle
                heading="Exclusive Property Deals Just for You"
                subHeading="Discover Hot Listings, Limited-Time Offers, and Unmissable Opportunities!"
            ></SectionTitle>
            {properties && properties.length > 0 ? (
               <div className='pt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                 {
                    properties.map(property =><AdvCard key={property._id} property={property}></AdvCard>)
                 }
               </div>
            ) : (
                <p>No Data Available</p>
            )}
        
            
        </>
    );
};

export default Advertisement;