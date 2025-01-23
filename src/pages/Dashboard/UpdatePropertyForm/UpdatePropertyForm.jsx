import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from "../../../api/utils";
import Loading from '../../../components/Loading';

function UpdatePropertyForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [uploadImage, setUploadImage] = useState({
        image: { name: "Upload Image" },
    });

    // Fetch property details
    const { data: property, isLoading, error } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        },
        onSuccess: (data) => {
            setLocation(data.location); 
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            const token = localStorage.getItem('token');
            return axios.patch(`http://localhost:5000/properties/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Property updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/dashboard/myAgentProperty');
        },
        onError: (error) => {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: error.message || 'Failed to update property.',
                showConfirmButton: true,
            });
        },
    });
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const location = form.location.value;
        const minPrice = parseFloat(form.minPrice.value);
        const maxPrice = parseFloat(form.maxPrice.value);
        const imageFile = form.image.files[0];

        let imageUrl = property.image;
        if (imageFile) {
            imageUrl = await imageUpload(imageFile);
        }

        const updatedData = {
            title,
            location,
            minPrice,
            maxPrice,
            image: imageUrl,
        };

        updateMutation.mutate(updatedData);
        setLoading(false);
    };

    if (isLoading) return <p><Loading></Loading></p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full min-h-[600px] flex flex-col justify-center items-center text-gray-800 rounded-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10">

                <div className="flex gap-4">
                    {/* Property Image */}
                    <div className="p-4 w-full m-auto rounded-lg flex-grow">
                        <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                            <div className="flex flex-col w-max mx-auto text-center">
                                <label>
                                    <input
                                        onChange={(e) => setUploadImage({ image: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })}
                                        className="text-sm cursor-pointer w-36 hidden"
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        hidden
                                    />
                                    <p className=" text-sm text-gray-500">Current Image: <a href={property.image} target="_blank" rel="noopener noreferrer" className="text-lime-600 underline">View</a></p>
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
                    {/* Property Title */}
                    <div className=" text-sm">
                        <label htmlFor="title" className="block text-gray-600">Property Title</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                            name="title"
                            id="title"
                            type="text"
                            defaultValue={property.title}
                            required
                        />
                    </div>
                </div>

                {/* Property Location */}
                <div className=" text-sm">
                    <label htmlFor="location" className="block text-gray-600">
                        Property Location
                    </label>
                    <select
                        required
                        className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                        name="location"
                        id="location"
                        // value={location}
                        defaultValue={property.location}
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
                {/*  */}
                {/* Price Range */}
                <div className=" text-sm">
                    <label htmlFor="minPrice" className="block text-gray-600">Minimum Price</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                        name="minPrice"
                        id="minPrice"
                        type="number"
                        defaultValue={property.minPrice}
                        required
                    />
                </div>
                <div className=" text-sm">
                    <label htmlFor="maxPrice" className="block text-gray-600">Maximum Price</label>
                    <input
                        className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                        name="maxPrice"
                        id="maxPrice"
                        type="number"
                        defaultValue={property.maxPrice}
                        required
                    />
                </div>


                <div className="md:flex flex-col space-y-4 gap-4">
                    {/* Agent Name */}
                    <div className=" text-sm">
                        <label htmlFor="agentName" className="block text-gray-600">Agent Name</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                            name="agentName"
                            id="agentName"
                            type="text"
                            value={property.agent?.name || ''}
                            readOnly
                        />
                    </div>

                    {/* Agent Email */}
                    <div className=" text-sm">
                        <label htmlFor="agentEmail" className="block text-gray-600">Agent Email</label>
                        <input
                            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                            name="agentEmail"
                            id="agentEmail"
                            type="email"
                            value={property.agent?.email || ''}
                            readOnly
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-700"
                    >
                        {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Update Property"}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default UpdatePropertyForm;
