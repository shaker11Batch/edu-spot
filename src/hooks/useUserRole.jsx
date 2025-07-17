import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../shared/Context/AuthContext';

const useUserRole = () => {
    const [role, setRole] = useState(null)
    const [roleLoading, setRoleLoading]= useState(true)
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const fetchUserRole = async () => {
            const { data } = await axiosSecure(`/user-role/${user?.email}`)
           setRole(data?.role)
           setRoleLoading(false)
        }
        fetchUserRole()
    }, [user, axiosSecure])

    return [role, roleLoading]
};

export default useUserRole;