import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SectionTitle from '../../components/SectionTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakeOffer = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [offerAmount, setOfferAmount] = useState('');
    const [totalQuantity, setTotalQuantity] = useState(1);
    const [buyingDate, setBuyingDate] = useState('');
    const location = useLocation();
    const property = location.state?.property;
    const [offerInfo, setOfferInfo] = useState({
        buyer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
        },
        propertyId: property?._id,
        price: 0,
        quantity: 1,
        agent: property?.agent?.email,
        location: property?.location,
        image: property?.image,
        title: property?.title,
        date: '',
        status: 'Pending',
    });

    const totalOfferAmount = offerAmount * totalQuantity || 0;

    useEffect(() => {
        setOfferInfo((prev) => ({
            ...prev,
            price: totalOfferAmount,
            quantity: totalQuantity,
            date: buyingDate ? new Date(buyingDate).toISOString() : '',
        }));
    }, [offerAmount, totalQuantity, buyingDate, totalOfferAmount]);

    if (!property) {
        return <p>No property data available.</p>;
    }

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value < 0 || value > 2 || isNaN(value)) {
            Swal.fire('Quantity must be 0, 1, or 2!', '', 'error');
            return;
        }
        setTotalQuantity(value);
    };

    const [offerError, setOfferError] = useState('');

    const handleOfferChange = (e) => {
        const value = e.target.value.trim();

        // Added range limits based on property price
        const minPrice = property?.minPrice || 1000;
        const maxPrice = property?.maxPrice || 500000;
        const numericValue = parseInt(value, 10);

        if (
            isNaN(numericValue) ||
            !Number.isInteger(numericValue) ||
            numericValue < minPrice ||
            numericValue > maxPrice
        ) {
            setOfferError(
                `Offer amount must be an integer between ${minPrice.toLocaleString()} and ${maxPrice.toLocaleString()}.`
            );
            setOfferAmount(''); 
        } else {
            setOfferError('');
            setOfferAmount(numericValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosSecure.post('/offer', offerInfo);
            await axiosSecure.patch(`/property/quantity/${property?._id}`, {
                quantityToUpdate: totalQuantity,
                status: 'decrease',
            });

            Swal.fire(
                'Offer Submitted Successfully!',
                'Your offer is being reviewed by the agent.',
                'success'
            );
            navigate('/dashboard/propBought');
        } catch (error) {
            Swal.fire('Failed to submit the offer!', '', 'error');
        }
    };

    return (
        <>
            <Helmet>
                <title>House Box | Make Offer</title>
            </Helmet>

            <div className="container mx-auto p-6 max-w-md md:max-w-2xl lg:max-w-4xl ">
                <SectionTitle heading="Make an Offer" subHeading="Enter your offer within the agent's price range" />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block font-semibold">Property Title</label>
                            <input
                                type="text"
                                value={property?.title || ''}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Property Location</label>
                            <input
                                type="text"
                                value={property?.location || ''}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Agent Email</label>
                            <input
                                type="text"
                                value={property?.agent?.email || ''}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Amount</label>
                            <input
                                type="text"
                                value={`${property?.minPrice || 1000} - ${property?.maxPrice || 10000}`}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">Offer Amount</label>
                            <input
                                type="number"
                                value={offerAmount}
                                onChange={handleOfferChange}
                                step="1" 
                                min={property?.minPrice || 1000} 
                                max={property?.maxPrice || 500000} 
                                placeholder={`Enter an amount between ${property?.minPrice || 1000} and ${property?.maxPrice || 500000}`}
                                className={`input input-bordered w-full ${offerError ? 'border-red-500' : ''}`}
                                required
                            />
                            {offerError && <p className="text-red-500 text-sm mt-1">{offerError}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold">Quantity</label>
                            <input
                                type="number"
                                value={totalQuantity}
                                onChange={handleQuantityChange}
                                placeholder="Enter 0, 1, or 2"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Buyer Email</label>
                            <input
                                type="text"
                                value={user?.email || ''}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Buyer Name</label>
                            <input
                                type="text"
                                value={user?.displayName || 'Anonymous'}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Buying Date</label>
                            <input
                                type="date"
                                value={buyingDate}
                                onChange={(e) => {
                                    setBuyingDate(e.target.value);
                                }}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">Total Offer Amount</label>
                            <input
                                type="text"
                                value={totalOfferAmount ? `$ ${totalOfferAmount}` : ''}
                                required
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn bg-lime-700 text-white w-full hover:bg-lime-900 transition-colors">
                        Make Offer
                    </button>
                </form>
            </div>
        </>
    );
};

export default MakeOffer;
