import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import SectionTitle from "./SectionTitle";


const HouseSection = () => {
    const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("/houses.json")
      .then((response) => response.json())
       .then((data) => setHouses(data));
     
  }, []);

  return (
    <section className="p-6 bg-lime-50 my-12">
      <SectionTitle
                heading="Available Properties"
                subHeading="Explore Our Featured Properties for Rent and Sale"
            ></SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {houses.map((house) => (
          <div
            key={house.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={house.image}
              alt={house.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{house.name}</h3>
              <p className="text-gray-600 mt-2 flex gap-1"><TbFileDescription className="text-xl md:text-2xl" />{house.description}</p>
              <p className="text-sm text-gray-500 mt-2 flex gap-1 items-center"><FaLocationDot /> {house.location}</p>
              <p className="text-sm text-gray-500 mt-2 flex gap-1 items-center"><IoMdPricetags /> {house.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HouseSection;