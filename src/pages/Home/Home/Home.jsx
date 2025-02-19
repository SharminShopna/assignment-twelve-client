import { Helmet } from "react-helmet";
  import Banner from "../Banner/Banner";
import HeroSection from "../../../components/HeroSection";
import HouseSection from "../../../components/HouseSection";
import RealEstateCard from "../../../components/RealEstateCard";
import Advertisement from "../Advertisement";
import LatestReviews from "../../../components/LatestReviews";
import Contact from "../../../components/Contact";
import FeatureSection from "../../../components/CardSection/FeatureSection";
import Brand from "../../../components/Brand/Brand";


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
        <LatestReviews></LatestReviews>
        <HeroSection></HeroSection>
        <FeatureSection></FeatureSection>
        <HouseSection></HouseSection>
        <RealEstateCard></RealEstateCard>
        <Brand></Brand>
        <Contact></Contact>
        
            
        </div>
        </>
    );
};

export default Home;