import React, { use } from 'react';
import { AuthContext } from '../shared/Context/AuthContext';

const useAuth = () => {
    const { user } = use(AuthContext)
    return { user }
}
export default useAuth;
