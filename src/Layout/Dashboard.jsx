import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <>
        <div>
            <div className="w-64 min-h-screen bg-lime-700">
                <ul className="property p-4">
                    <li>
                        <NavLink></NavLink>
                    </li>

                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
            
        </div>
        </>
    );
};

export default Dashboard;