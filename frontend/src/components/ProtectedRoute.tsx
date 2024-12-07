import React from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
    isToken: boolean;
    children: React.ReactElement;
    option: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isToken, option, children}) => {

    if (option === 0 && !isToken) {
        return <Navigate to="/login"/>;
    }

    if (option === 1 && isToken) {
        return <Navigate to="/home"/>;
    }

    return children;

};

export default ProtectedRoute;
