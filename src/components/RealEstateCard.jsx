import React from 'react';
import Card from './card';
import SectionTitle from './SectionTitle';

const RealEstateCard = () => {
    const properties = [
        { title: "Luxury Villa", description: "A spacious villa with modern amenities and beautiful surroundings." },
        { title: "Cozy Apartment", description: "A compact yet comfortable apartment in the heart of the city." },
        { title: "Beachside Bungalow", description: "Enjoy breathtaking ocean views from this charming bungalow." },
        { title: "Urban Loft", description: "A stylish loft with industrial vibes and close to downtown." },
        { title: "Suburban Home", description: "A perfect family home with a big backyard and quiet neighborhood." },
        { title: "Modern Condo", description: "An elegant condo with high-tech features and premium facilities." },
        { title: "Rustic Cabin", description: "A cozy cabin surrounded by nature, perfect for a weekend getaway." },
        { title: "Penthouse Suite", description: "A luxurious penthouse with panoramic city views." }
      ];
    
      return (
        <div className="bg-gradient-to-r from-lime-100 to-lime-50 py-12 mb-12">
          <div className="container mx-auto px-6">
          <SectionTitle
                heading="Featured Properties"
                subHeading="Handpicked Properties for the Best Living Experience"
            ></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {properties.map((property, index) => (
                <Card key={index} title={property.title} description={property.description} />
              ))}
            </div>
          </div>
        </div>
      );
};

export default RealEstateCard;