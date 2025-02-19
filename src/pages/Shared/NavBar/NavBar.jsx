import {  Link, NavLink, useLocation} from "react-router-dom";
import logo from "../../../assets/logo1.jpg";
 import "../../../../src/App.css";
 
 import { FaRegCircleUser } from "react-icons/fa6";
//  import { FaSun, FaMoon } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
    const { user, logOut } = useAuth()
    const links = (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
           <li>
            <NavLink to='/allProperties'>All Properties</NavLink>
          </li>
          
           <li>
            <NavLink to="/contactUs">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/aboutUs">About Us</NavLink>
          </li>
          {user ? (
            <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>
          ) : (
            ""
          )}  
        </>
      );
    return (
        <div className="w-full justify-center flex">
            <div className="pt-5 fixed w-full bg-lime-200 top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-30 ">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex gap-1 text-center items-center justify-center">
            <img className="w-14 h-14 rounded-full bg-lime-700 p-2 border" src={logo} alt="" />
            <h2 className="text-3xl italic text-lime-700 font-bold hidden md:block">
              HOUSEBOX
            </h2>
           
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end space-x-2">
          {user && user?.email ? (
            <div className="text-center space-x-2 image">
              <img referrerpolicy="no-referrer" className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
              <p className="name">{user.displayName}</p>
            </div>
          ) : (
            <p className="text-3xl text-lime-700">
              <FaRegCircleUser />
            </p>
          )}

          {user && user?.email ? (
            <button onClick={logOut} className="btn bg-lime-700 text-white">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn bg-lime-700 text-white" data-tooltip-id="my-tooltip"
                data-tooltip-content="Please use your correct email and password">
                Login
              </Link>
              <NavLink to="/register" className="btn bg-lime-700 text-white" data-tooltip-id="my-tooltip"
                data-tooltip-content="Please Register with your personal information">
                Register
              </NavLink>
            </>
          )}

          
          {/* {location.pathname === "/" && (
            <button onClick={toggleDarkMode} className="btn bg-blue-900 text-white">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          )} */}
        </div> 
      </div>
    </div>
    <Tooltip id="my-tooltip" />
        </div>
    );
};

export default NavBar;