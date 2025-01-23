import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PropBought = () => {
  const userId = 'user-id'; // Replace with the actual logged-in user's ID or fetch from context

  // Fetch bought properties
  const { data: boughtProperties = [], isLoading, error } = useQuery({
    queryKey: ['boughtProperties', userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/bought/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt-token')}`, // Include the JWT token
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Properties Bought</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boughtProperties.length > 0 ? (
          boughtProperties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-800 mt-2">
                  <strong>Agent:</strong> {property.agentName}
                </p>
                <p className="text-gray-800">
                  <strong>Offered Amount:</strong> ${property.offeredAmount}
                </p>
                <div
                  className={`mt-4 text-center font-semibold py-1 rounded ${
                    property.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : property.status === 'approved'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {property.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            You have not bought any properties yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropBought;

{/* <option value="Kabul">Kabul</option>
<option value="Vienna">Vienna</option> */}
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProperty = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [location, setLocation] = useState("");
    const [uploadImage, setUploadImage] = useState({
        image: { name: "Upload Image" },
    });
    const [loading, setLoading] = useState(false);

    // Function to add property
    const handleAddProperty = async (propertyData) => {
        try {
            const response = await axiosSecure.post("/property", propertyData);
            console.log("Property added", response.data);

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${propertyData.title} Added Successfully`,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            console.error("Error adding property", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const location = form.location.value;
        const minPrice = parseFloat(form.minPrice.value);
        const maxPrice = parseFloat(form.maxPrice.value);
        const quantity = parseInt(form.quantity.value);
        const description = form.description.value;
        const image = form.image.files[0];
        const imageUrl = await imageUpload(image);

        // Agent information
        const agent = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };

        // Property data object
        const propertyData = {
            title,
            location,
            minPrice,
            maxPrice,
            quantity,
            description,
            image: imageUrl,
            agent,
        };

        // Call handleAddProperty
        await handleAddProperty(propertyData);

        setLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>House Box | Add Property</title>
                <meta name="description" content="Add a new property to the system" />
            </Helmet>

            <div className="w-full min-h-[600px] flex flex-col justify-center items-center text-gray-800 rounded-xl">
                <SectionTitle
                    heading="Let’s Add a New Property!"
                    subHeading="Enter details to list your property"
                ></SectionTitle>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            {/* Property Title */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="title" className="block text-gray-600">
                                    Property Title
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="title"
                                    id="title"
                                    type="text"
                                    placeholder="Enter property title"
                                    required
                                />
                            </div>

                            {/* Property Location */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="location" className="block text-gray-600">
                                    Property Location
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="location"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select property location
                                    </option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chittagong">Chittagong</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Tokyo">Tokyo</option>
                                    <option value="Kabul">Kabul</option>
                                    <option value="Vienna">Vienna</option>
                                </select>
                            </div>

                            {/* Min Price */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="minPrice" className="block text-gray-600">
                                    Minimum Price
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="minPrice"
                                    id="minPrice"
                                    type="number"
                                    placeholder="Enter minimum price"
                                    required
                                />
                            </div>

                            {/* Max Price */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="maxPrice" className="block text-gray-600">
                                    Maximum Price
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="maxPrice"
                                    id="maxPrice"
                                    type="number"
                                    placeholder="Enter maximum price"
                                    required
                                />
                            </div>

                            {/* Property Description */}
                            <div className="space-y-2 text-sm">
                                <label htmlFor="description" className="block text-gray-600">
                                    Property Description
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="description"
                                    id="description"
                                    placeholder="Enter property description"
                                    required
                                />
                            </div>

                            {/* Quantity */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="quantity" className="block text-gray-600">
                                    Quantity
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-700 focus:outline-lime-500 rounded-md bg-white"
                                    name="quantity"
                                    id="quantity"
                                    type="number"
                                    placeholder="Available quantity"
                                    required
                                    min="0"
                                    max="10"
                                    onInput={(e) => {
                                        if (e.target.value > 10) e.target.value = 10;
                                        if (e.target.value < 0) e.target.value = 0;
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-6 flex flex-col">
                            {/* Agent Name */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="agentName" className="block text-gray-600">
                                    Agent Name
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                                    name="agentName"
                                    id="agentName"
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                />
                            </div>

                            {/* Agent Email */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="agentEmail" className="block text-gray-600">
                                    Agent Email
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                                    name="agentEmail"
                                    id="agentEmail"
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                />
                            </div>

                            {/* Property Image */}
                            <div className="p-4 w-full m-auto rounded-lg flex-grow">
                                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <div className="flex flex-col w-max mx-auto text-center">
                                        <label>
                                            <input
                                                onChange={(e) =>
                                                    setUploadImage({
                                                        image: e.target.files[0],
                                                        url: URL.createObjectURL(e.target.files[0]),
                                                    })
                                                }
                                                className="text-sm cursor-pointer w-36 hidden"
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                hidden
                                            />
                                            <div className="bg-lime-700 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                                                {uploadImage?.image?.name}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {uploadImage && uploadImage?.image?.size && (
                                <div className="flex gap-5 items-center">
                                    <img className="w-24" src={uploadImage?.url} alt="" />
                                    <p>Image Size: {uploadImage?.image?.size} Bytes</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-700"
                            >
                                {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Add Property"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProperty;



import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AgentRequestedProp = () => {
  const queryClient = useQueryClient();
  const { data: offers = [], isLoading } = useQuery(['agentOffers'], async () => {
    const response = await axios.get(`/agent/offers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  });

  const updateOfferMutation = useMutation(
    async ({ offerId, action }) => {
      const response = await axios.patch(
        `/agent/offers/${offerId}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['agentOffers']);
      },
    }
  );

  const handleAction = (offerId, action) => {
    updateOfferMutation.mutate({ offerId, action });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Requested/Offered Properties</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Property Title</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Buyer Name</th>
            <th className="border border-gray-300 p-2">Buyer Email</th>
            <th className="border border-gray-300 p-2">Offered Price</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td className="border border-gray-300 p-2">{offer.propertyTitle}</td>
              <td className="border border-gray-300 p-2">{offer.propertyLocation}</td>
              <td className="border border-gray-300 p-2">{offer.buyerName}</td>
              <td className="border border-gray-300 p-2">{offer.buyerEmail}</td>
              <td className="border border-gray-300 p-2">${offer.offeredPrice}</td>
              <td className="border border-gray-300 p-2">{offer.status}</td>
              <td className="border border-gray-300 p-2">
                {offer.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleAction(offer._id, 'accepted')}
                      className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(offer._id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentRequestedProp;


