import React from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/cover.jpg";
import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading";
import SectionTitle from "../../../components/SectionTitle";


const AgentProfile = () => {
  const { user } = useAuth();

  console.log(user);

  if (!user) {
    return <p><Loading></Loading></p>; 
  }

  return (
    <div>
      <Helmet>
        <title>House Box | Profile</title>
      </Helmet>
      <div className="">
        <SectionTitle
          heading="Your Profile"
          subHeading="View and manage your account details"
        />
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
            <img
              alt="cover photo"
              src={coverImg}
              className="w-full mb-4 rounded-t-lg h-56"
            />
            <div className="flex flex-col items-center justify-center p-4 -mt-16">
              <a href="#" className="relative block">
                <img
                  alt="profile"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
                />
              </a>

              <p className="p-2 px-4 text-xs text-white bg-lime-700 rounded-full">
                Agent
              </p>
              <p className="mt-2 text-xl font-medium text-gray-800">
                User Id: {user.uid || "N/A"}
              </p>
              <div className="w-full p-2 mt-4 rounded-lg">
                <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                  <p className="flex flex-col">
                    Name
                    <span className="font-bold text-black">
                      {user.displayName || "Anonymous"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    Email
                    <span className="font-bold text-black">
                      {user.email || "N/A"}
                    </span>
                  </p>
                  <div>
                    <button className="bg-lime-700 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-900 block mb-1">
                      Update Profile
                    </button>
                    <button className="bg-lime-700 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-900">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
