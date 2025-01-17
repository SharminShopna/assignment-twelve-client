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
    const axiosSecure = useAxiosSecure()
    const [location, setLocation] = useState("");
    const [uploadImage,setUploadImage] = useState({name:'upload Image'})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const title = form.title.value;
        const location = form.location.value;
        const price = parseFloat(form.price.value);
        const image = form.image.files[0];
        const imageUrl = await imageUpload(image);

        // Agent information
        const agent = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };

        // Create Property data object
        const propertyData = {
            title,
            location,
            price,
            image: imageUrl,
            agent
        }
        console.table(propertyData)

        // save Property in DB
        try{
             await axiosSecure.post('/property',propertyData)
             Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${propertyData.title} Added Successfully`,
                showConfirmButton: false,
                timer: 1500
              });

        }
        catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }


    };

    return (
        <>
            <Helmet>
                <title>House Box | AddProperty</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <SectionTitle heading="Let’s Add a New Property!" subHeading="Enter details to list your property"></SectionTitle>
            <div className="w-full min-h-[600px] flex flex-col justify-center items-center text-gray-800 rounded-xl">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                                    <option value="" disabled selected>
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

                            {/* Price Range */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="price" className="block text-gray-600">
                                    Price Range
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                                    name="price"
                                    id="price"
                                    type="number"
                                    placeholder="Enter price range"
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
                                    value={user?.displayName || ''}
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
                                    value={user?.email || ''}
                                    readOnly
                                />
                            </div>

                            {/* Property Image */}
                            <div className="p-4 w-full m-auto rounded-lg flex-grow">
                                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <div className="flex flex-col w-max mx-auto text-center">
                                        <label>
                                            <input
                                            onChange={e => setUploadImage(e.target.files[0])}
                                                className="text-sm cursor-pointer w-36 hidden"
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                hidden
                                            />
                                            <div className="bg-lime-700 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                                                {uploadImage.name}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                uploadImage.size &&
                                <p>Image Size: {uploadImage.size} Bytes</p>
                            }

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-700"
                            >
                               { loading? (
                                <TbFidgetSpinner className='animate-spin m-auto'  />
                               ):(
                                'Add Property'
                               )
                                
                               }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default AddProperty;