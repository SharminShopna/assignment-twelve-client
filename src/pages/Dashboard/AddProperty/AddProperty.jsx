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
        image: { name: "Upload Image" }
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
        const price = parseFloat(form.price.value);
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
            price,
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
            <SectionTitle
                heading="Let’s Add a New Property!"
                subHeading="Enter details to list your property"
            ></SectionTitle>
            <div className="w-full min-h-[600px] flex flex-col justify-center items-center text-gray-800 rounded-xl">
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
                                </select>
                            </div>

                            {/* Price */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="price" className="block text-gray-600">
                                    Price
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="price"
                                    id="price"
                                    type="number"
                                    placeholder="Enter price"
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
                                                onChange={(e) => setUploadImage({ image: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })}
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
