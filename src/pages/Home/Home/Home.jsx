import { Helmet } from "react-helmet";
 import Banner from "../Banner/Banner";
import HeroSection from "../../../components/HeroSection";
import HouseSection from "../../../components/HouseSection";
import RealEstateCard from "../../../components/RealEstateCard";
import Advertisement from "../Advertisement";


const Home = () => {
    return (
        <>
        <Helmet>
        <title>House Box | Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
        <div className="">
        <Banner></Banner>
        <Advertisement></Advertisement>
        <HeroSection></HeroSection>
        <HouseSection></HouseSection>
        
        <RealEstateCard></RealEstateCard>
            
        </div>
        </>
    );
};

export default Home;