import React from 'react';
import error from '../../assets/404.png'
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <>
        <div className="space-y-3">
        <img
           src={error}
          className="w-full h-[300px] md:h-[600px]" />
          <Link to='/' className='btn bg-red-600 text-white text-xl px-6 ml-[45%] text-center '>Go Home</Link>
            
        </div>
        </>
    );
};

export default Error;