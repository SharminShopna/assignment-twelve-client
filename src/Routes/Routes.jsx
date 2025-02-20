import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error from "../pages/Error/Error";
import Dashboard from "../Layout/Dashboard";
import AddProperty from "../pages/Dashboard/AddProperty/AddProperty";
import MyAgentProperties from "../pages/Dashboard/MyAgentProperties/MyAgentProperties";
import AgentSoldProperties from "../pages/Dashboard/AgentSoldProperties/AgentSoldProperties";
import AgentRequestedProp from "../pages/Dashboard/AgentRequestedProp/AgentRequestedProp";
import PrivateRouter from "./PrivateRoute";
import PropertyDetails from "../pages/PropertyDetails";
import Wishlist from "../pages/User/Wishlist";
import PropBought from "../pages/User/PropBought";
import MyReviews from "../pages/User/MyReviews";
import MakeOffer from "../pages/User/MakeOffer";
import ManageUsers from "../pages/Dashboard/AdminDashbord/ManageUsers";
import BecomeAgent from "../pages/Dashboard/BecomeAgent/BecomeAgent";
import Profile from "../pages/Dashboard/Profile/Profile";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";
import UpdatePropertyForm from "../pages/Dashboard/UpdatePropertyForm/UpdatePropertyForm";
import ManageProperties from "../pages/Dashboard/AdminDashbord/ManageProperties";
import AllProperties from "../pages/Common/AllProperties";
import ManageReviews from "../pages/Dashboard/AdminDashbord/ManageReviews";
import Advertise from "../pages/Dashboard/AdminDashbord/Advertise";
import OfferProperty from "../pages/User/OfferProperty";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element: <Home></Home>,
        },
        {
          path:'logIn',
          element:<Login></Login>
        },
        {
          path:'register',
          element:<Register></Register>
        },
        {
          path:'contactUs',
          element:<Contact></Contact>
        },
        {
          path:'aboutUs',
          element:<AboutUs></AboutUs>
        },
        {
          path:'propDetails/:id',
          element:(
          <PropertyDetails></PropertyDetails>
          )
        },
        {
          path:'allProperties',
          element:(
           <AllProperties></AllProperties>
          )
        },
        
        
      ]
    },
    
    {
      path:'dashboard',
      element: (
        <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
      ),
      children:[
        // Admin related
        {
          path: 'manageUsers',
          element:(
            <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
          ),
        },
        {
          path: 'manageProperty',
          element:(
            <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
          ),
        },
        {
          path: 'manageReviews',
          element:(
            <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
          ),
        },
        {
          path: 'advertise',
          element:(
            <AdminRoute><Advertise></Advertise></AdminRoute>
          ),
        },
        // Agent related
        {
          path:'profile',
          element: <Profile></Profile>,
        },
         {
           path:'becomeAgent',
           element:(
            <AgentRoute><BecomeAgent></BecomeAgent></AgentRoute>
           )
         },
        {
          path:'addProperty',
          element:(
            <AgentRoute><AddProperty></AddProperty></AgentRoute>
          )
        },
        {
          path: 'myAgentProperty',
          element: (
            <AgentRoute><MyAgentProperties></MyAgentProperties></AgentRoute>
          )
        },
        {
          path: 'updateProperty/:id',
          element: (
            <AgentRoute><UpdatePropertyForm></UpdatePropertyForm></AgentRoute>
          )
        },
        {
          path:'agentSoldProperty',
          element: (
          <AgentRoute><AgentSoldProperties></AgentSoldProperties></AgentRoute>
        )
        },
        {
          path: 'agentRequestProp',
          element: (
            <AgentRoute><AgentRequestedProp></AgentRequestedProp></AgentRoute>
          )
        },
        // user related
        {
          path: 'wishList',
          element: <Wishlist></Wishlist>
        },
        {
          path: 'propBought',
          element: <PropBought></PropBought>
        },
        {
          path: 'myReviews',
          element: <MyReviews></MyReviews>
        },
        {
          path: 'makeOffer',
          element: <MakeOffer></MakeOffer>
        },
        {
          path: 'offer',
          element: <OfferProperty></OfferProperty>
        }
       

       ]
    }
  ]);