/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";



const PrivateRouter = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children;
    }
    return (
        <Navigate state={location.pathname} to={"/logIn"}>
            
        </Navigate>
    );
};

export default PrivateRouter;