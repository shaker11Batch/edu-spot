import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Error from "../shared/ErrorComponent/Error";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <Error></Error>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            }
        ]
    }
])