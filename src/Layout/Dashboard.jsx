import { Helmet } from "react-helmet";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiFlamethrowerSoldier } from "react-icons/gi";
import { IoMdGitPullRequest, IoMdHome } from "react-icons/io";
import { LuTableProperties } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import SectionTitle from "../components/SectionTitle";
import { SiWish } from "react-icons/si";
import { FaSellcast } from "react-icons/fa6";
import Footer from "../pages/Shared/Footer/Footer";
import { MdOutlineReviews } from "react-icons/md";

const Dashboard = () => {
    return (
        <>
        <Helmet>
        <title>House Box | Dashboard</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <NavBar></NavBar>
        <div className="flex mt-24">
            <div className="w-64 min-h-screen bg-lime-700 pt-12">
                <h2 className="text-center text-white text-2xl pt-8 pb-12 font-bold">Agent Dashboard</h2>
                <ul className="property p-4 text-gray-100 space-y-2">
                    
                    <li>
                        <NavLink 
                            to='/dashboard/addProperty' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <AiOutlinePropertySafety />
                            Add Property
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/myAgentProperty' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <LuTableProperties />
                            My Added Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/agentSoldProperty' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <GiFlamethrowerSoldier />
                            My Sold Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/agentRequestProp' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <IoMdGitPullRequest />
                            Requested Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/wishList' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <SiWish />
                            Wishlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/propBought' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <FaSellcast />
                            Property Bought
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/myReviews' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <MdOutlineReviews />
                            My Reviews
                        </NavLink>
                    </li>
                    <div className="space-y-8">
                        <br></br>
                    <div className="divider">OR</div>
                    <li>
                        <NavLink 
                            to='/dashboard/agentProfile' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <CgProfile />
                            Admin Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/agentProfile' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <CgProfile />
                            Agent Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/dashboard/agentProfile' 
                            className={({ isActive }) => 
                                `flex font-semibold items-center gap-2 px-4 py-2 rounded ${
                                    isActive ? 'bg-white text-lime-700' : 'hover:bg-lime-900'
                                }`
                            }
                        >
                            <CgProfile />
                            User Profile
                        </NavLink>
                    </li>
                    </div>
                </ul>
            </div>
            
            <div className="flex-1 p-8">
                {/* <SectionTitle heading="Property Insights Dashboard" subHeading="Gateway to Real Estate Success"></SectionTitle> */}
                <Outlet />
            </div>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Dashboard;
