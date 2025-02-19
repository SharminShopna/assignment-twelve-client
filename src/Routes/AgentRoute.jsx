import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useRole from '../hooks/useRole';

const AgentRoute = ({children}) => {
    const [role, isLoading] = useRole();
   
    if(isLoading) {
        return <Loading />;
    }
    
    if(role === 'agent') {
        return children;
    }

    return (
        <Navigate to="/dashboard" replace={true} />
    );
};

export default AgentRoute;
