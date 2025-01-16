import { AiOutlinePropertySafety } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiFlamethrowerSoldier } from "react-icons/gi";
import { IoMdGitPullRequest } from "react-icons/io";
import { LuTableProperties } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
        <div className="flex">
            <div className="w-64 min-h-screen bg-lime-700 pt-12">
                <ul className="property p-4 text-gray-100 space-y-2">
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
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
        </>
    );
};

export default Dashboard;
