import React from 'react';
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
    const { _id, image, title, location, minPrice, maxPrice, agent, status } = property;

    return (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white group">
            {/* Property Image */}
            <div className="relative w-full h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                />
                <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-sm font-medium shadow ${
                        status === 'verified' ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'
                    }`}
                >
                    {status === 'verified' ? 'Verified' : 'Not Verified'}
                </div>
            </div>

            {/* Property Details */}
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="flex items-center text-gray-600 mb-2">
                   Location: <IoLocationOutline className="mr-1" /> {location}
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                    <BsCurrencyDollar className="mr-1" />Price: {minPrice} - {maxPrice}
                </p>
                <div className="flex items-center gap-2 mt-4">
                    <img
                        src={agent?.image}
                        alt={agent?.name}
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="text-sm font-medium">{agent?.name}</span>
                </div>
                <Link
                    to={`/propDetails/${_id}`}
                    className="mt-4 inline-block w-full text-center bg-lime-700 text-white py-2 rounded-md hover:bg-lime-500 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
