import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Banner from "../pages/Home/Banner/Banner";



const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="w-11/12 mx-auto">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;