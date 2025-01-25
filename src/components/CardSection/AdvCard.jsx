import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const AdvCard = ({ property }) => {
    const { _id, image, location, minPrice, maxPrice, status } = property || {};

    return (
        <div
            className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
        >
            <div className="flex flex-col gap-2 w-full">
                {/* Property Image */}
                <div
                    className="
                        aspect-square 
                        w-full 
                        relative 
                        overflow-hidden 
                        rounded-xl
                    "
                >
                    <img
                        className="
                            object-cover 
                            h-full 
                            w-full 
                            group-hover:scale-110 
                            transition
                        "
                        src={image}
                        alt={location}
                    />
                    {/* Verification Badge */}
                    <div
                        className="
                            absolute 
                            top-3 
                            right-3 
                            bg-green-600
                            text-white 
                            text-sm 
                            font-medium 
                            px-2 
                            py-1 
                            rounded-full 
                            shadow
                        "
                    >
                        {status ? 'Verified' : 'Not Verified'}
                    </div>
                </div>

                {/* Property Details */}
                <div className="font-semibold text-lg flex items-center gap-1"><IoLocationOutline /> {location}</div>
                <div className="font-semibold text-lg flex items-center gap-1"><BsCurrencyDollar /> {minPrice} - {maxPrice}</div>
                <div className="mt-2">
                     <Link to={`/propDetails/${_id}`} className="px-4 py-2 bg-lime-700 text-white rounded hover:bg-lime-900"> 
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdvCard;
