import React, { use } from 'react';
import { AuthContext } from '../../shared/Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../../shared/LoadingSpinner';

const PrivateRoute = ({children}) => {

    const { users, loading } = use(AuthContext)
    const location = useLocation()


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (!users) {
        return <Navigate to='/login'  state={location.pathname}  ></Navigate>
    }

    return children
};

export default PrivateRoute;