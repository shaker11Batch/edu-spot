import axios from 'axios';
import useAuth from './useAuth';




const axiosInstance = axios.create({
    baseURL: `http://localhost:5000`
})



const useAxiosSecure = () => {
    // const { user } = useAuth()
    // console.log('user', user)
    // const token = user?.accessToken;
    // console.log('accesstoken', token)

    // axiosInstance.interceptors.request.use(config => {
    //     config.headers.Authorization = `Bearer ${token} `
    //     return config;
    // })

    return axiosInstance
};

export default useAxiosSecure;