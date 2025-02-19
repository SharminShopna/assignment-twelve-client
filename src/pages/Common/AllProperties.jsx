import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SectionTitle from '../../components/SectionTitle';
import Loading from '../../components/Loading';
import PropertyCard from '../../components/CardSection/PropertyCard';
import { Helmet } from 'react-helmet';

const AllProperties = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchRef = useRef(null);
  const [sort, setSort] = useState('none'); 

  // Debouncing the search input to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchLocation);
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchLocation]);

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['allProperties', debouncedSearch, sort],
    queryFn: async () => {
      try {
        const { data } = await axios(
          `https://assignment-twelve-server-drab.vercel.app/all-properties?location=${debouncedSearch}&sort=${sort}`
        );
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
      <div className='mt-36 my-6'>
        <SectionTitle
          heading="All Properties"
          subHeading="Find your dream property from our exclusive listings."
        />
        <div className="container mx-auto px-4 py-8">
          <div className="md:flex space-y-2 justify-between items-center mb-6">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by location"
              className="border border-lime-700 p-2 rounded w-full max-w-xs"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <div className='flex gap-4'>
              <button
                onClick={() => setSort('asc')}
                className={`btn px-4 py-2 rounded ${sort === 'asc' ? 'bg-lime-500 text-gray-800' : 'bg-lime-700 text-white'}`}
              >
                Sort: Low to High
              </button>
              <button
                onClick={() => setSort('desc')}
                className={`btn px-4 py-2 rounded ${sort === 'desc' ? 'bg-lime-500 text-gray-800' : 'bg-lime-700 text-white'}`}
              >
                Sort: High to Low
              </button>
            </div>
          </div>
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
      </div>
    </>
  );
};

export default AllProperties;
