import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../shared/Context/AuthContext';
import LoadingSpinner from '../../shared/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return  <Navigate to='/logIn' state={location.pathname}></Navigate>;
       
    }

    return children;
};

export default PrivateRoute;
