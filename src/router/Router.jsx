import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Error from "../shared/ErrorComponent/Error";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddPost from "../pages/Dashboard/AddPost";
import MyPost from "../pages/Dashboard/MyPost";
import AnnouncementForm from "../pages/Dashboard/AnnouncementForm";
import AnnouncementList from "../pages/AnnouncementList/AnnouncementList";
import Membership from "../pages/Dashboard/Membership";
import Payments from "../pages/Dashboard/Payments";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import PrivateRoute from "../components/Private/PrivateRoute";
import PostDetails from "../pages/Dashboard/PostsDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'auth-announce',
                Component: AnnouncementList

            },
            {
                path: 'posts/:id',
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>
            },
            {
                path: '/membership',
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            },

            {
                path: '/payments',
                Component: Payments
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

    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'profile',
                Component: MyProfile
            },
            {
                path: 'add-post',
                Component: AddPost
            },
            {
                path: 'add-announcements',
                Component: AnnouncementForm,
            },
            {
                path: 'my-posts',
                Component: MyPost
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            },
        ]
    }
])