import React, { useState } from 'react';
import SectionTitle from './SectionTitle';

const AboutUs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>

    <div className="py-8 my-8 mt-24 px-6">
      <div className="max-w-5xl mx-auto">
      <SectionTitle
          heading="Welcome to HouseBox"
          subHeading="Your trusted real estate platform for buying and selling properties"
        />
        <p className="text-lg mb-6">
          At HouseBox, we are dedicated to providing seamless experiences for both buyers and sellers in the property market. Whether you're searching for your dream home or looking to sell your property, HouseBox connects you with verified listings and reliable agents to guide you every step of the way.
        </p>
        <p className="text-lg mb-6">
          Our platform offers a wide range of properties with detailed information, ensuring that you can make well-informed decisions. With a focus on simplicity and user-friendliness, HouseBox is designed to make your real estate journey smooth, transparent, and enjoyable.
        </p>
        <p className="text-lg mb-6">
          Thank you for choosing HouseBox. We look forward to helping you find the perfect property!
        </p>
        <div className="mt-8 text-left max-w-xl mx-auto">
          <h3 className="text-4xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="border-b pb-4 mt-4">
            <button 
              className="w-full text-left text-lg font-medium focus:outline-none"
              onClick={toggleDropdown}
            >
              What is HouseBox?
            </button>
            {isOpen && (
              <div className="mt-2">
                HouseBox is a real estate platform designed to connect buyers, sellers, and agents, providing a seamless and transparent property transaction process.
              </div>
            )}
          </div>
          <div className="border-b pb-4 mt-4">
            <button 
              className="w-full text-left text-lg font-medium focus:outline-none"
              onClick={toggleDropdown}
            >
              How can I list my property on HouseBox?
            </button>
            {isOpen && (
              <div className="mt-2">
                You can easily list your property by signing up as an agent on our platform and providing all the necessary details about your property.
              </div>
            )}
          </div>
          <div className="border-b pb-4 mt-4">
            <button 
              className="w-full text-left text-lg font-medium focus:outline-none"
              onClick={toggleDropdown}
            >
              How can I contact customer support?
            </button>
            {isOpen && (
              <div className="mt-2">
                You can reach our customer support team through our contact page or by sending an email to support@housebox.com.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AboutUs;
