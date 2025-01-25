import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SectionTitle from '../../components/SectionTitle';
import Loading from '../../components/Loading';
import PropertyCard from '../../components/CardSection/PropertyCard';
import { Helmet } from 'react-helmet';

const AllProperties = () => {
  // Fetch properties with react-query
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['allProperties'],
    queryFn: async () => {
      try {
        const { data } = await axios('http://localhost:5000/all-properties');
        return data.filter(property => property.status === 'verified');
      } catch (err) {
        console.error('Error fetching properties:', err);
        throw err;
      }
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Failed to load properties. Please try again later.</p>;

  return (
    <>
      <Helmet>
        <title>House Box | All Properties</title>
      </Helmet>
      <SectionTitle
        heading="All Properties"
        subHeading="Find your dream property from our exclusive listings."
      />
      <div className="container mx-auto px-4 py-8">
        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {properties.map(property => (
              <PropertyCard key={property._id} property={property}></PropertyCard>

            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No verified properties available at the moment.</p>
        )}
      </div>
    </>
  );
};

export default AllProperties;