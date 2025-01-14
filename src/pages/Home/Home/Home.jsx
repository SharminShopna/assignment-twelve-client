import { Helmet } from "react-helmet";
 import Banner from "../Banner/Banner";


const Home = () => {
    return (
        <>
        <Helmet>
        <title>House Box | Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
        <div className="">
        <Banner></Banner>
            
        </div>
        </>
    );
};

export default Home;