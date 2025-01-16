import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error from "../pages/Error/Error";
import Dashboard from "../Layout/Dashboard";
import AgentProfile from "../pages/Dashboard/AgentProfile/AgentProfile";
import AddProperty from "../pages/Dashboard/AddProperty/AddProperty";
import MyAgentProperties from "../pages/Dashboard/MyAgentProperties/MyAgentProperties";
import AgentSoldProperties from "../pages/Dashboard/AgentSoldProperties/AgentSoldProperties";
import AgentRequestedProp from "../pages/Dashboard/AgentRequestedProp/AgentRequestedProp";

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
        }
      ]
    },
    {
      path:'dashboard',
      element: <Dashboard></Dashboard>,
      children:[
        {
          path:'agentProfile',
          element: <AgentProfile></AgentProfile>
        },
        {
          path:'addProperty',
          element:<AddProperty></AddProperty>
        },
        {
          path: 'myAgentProperty',
          element: <MyAgentProperties></MyAgentProperties>
        },
        {
          path:'agentSoldProperty',
          element: <AgentSoldProperties></AgentSoldProperties>
        },
        {
          path: 'agentRequestProp',
          element: <AgentRequestedProp></AgentRequestedProp>
        }

       ]
    }
  ]);