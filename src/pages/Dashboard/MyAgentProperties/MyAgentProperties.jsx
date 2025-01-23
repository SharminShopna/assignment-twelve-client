import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { IoLocationOutline } from 'react-icons/io5';
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';
import { Link, useNavigate } from 'react-router-dom';

function MyAgentProperties() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');

      const response = await axios.get(
        `http://localhost:5000/propertySection`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log('Fetched data:', response.data);
      return response.data;
    },
  });


  // Mutation to delete a property
  const deleteMutation = useMutation({
    mutationFn: async (_id) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      return axios.delete(`http://localhost:5000/properties/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
      Swal.fire("Deleted!", "The property has been deleted successfully.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", error.message || "Failed to delete the property.", "error");
    },
  });

  // update handler

  const handleUpdate = (propertyId) => {
    navigate(`/dashboard/updateProperty/${propertyId}`);
  };


// delete agent property
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(_id);
      }
    });
  };

  if (isLoading) return <Loading />;
   if (error) return <div>Error: {error.message}</div>;
   if (!properties || properties.length === 0) return <div className='text-3xl text-center text-red-700'>--- No properties available ---</div>;

  return (
    <>

      <Helmet>
        <title>House Box | MyAddedProperties</title>
      </Helmet>

      <SectionTitle heading="My Added Properties" subHeading="Manage your listings easily" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-48 object-cover" src={property?.image} alt={property?.title} />
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2">{property.title}</h2>
              <p className="text-gray-700 text-base flex items-center gap-1"><IoLocationOutline />{property.location}</p>
              <p className="text-gray-500 text-sm">Agent: {property.agent.name}</p>
              <p className="text-gray-500 text-sm">Price Range: $ {property.minPrice} - {property.maxPrice}</p>
              <p className={`text-sm ${property.verificationStatus === 'verified'
                ? 'text-green-500'
                : property.verificationStatus === 'rejected'
                  ? 'text-red-500'
                  : 'text-yellow-500'
                }`}>
                Status: {property.verificationStatus}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-between">
            {property.verificationStatus !== 'rejected' && (
              <button
                className="btn bg-lime-700 text-white hover:bg-lime-900"
                onClick={() => handleUpdate(property._id)}
              >
                Update
              </button>
            )}
              <button
                className="btn text-white bg-red-600 hover:bg-red-800"
                onClick={() => handleDelete(property._id)}
                disabled={deleteMutation.isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyAgentProperties;
