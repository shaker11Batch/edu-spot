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
import PostsDetails from "../pages/Dashboard/PostsDetails";
import Membership from "../pages/Dashboard/Membership";
import Payments from "../pages/Dashboard/Payments";
import ManageUsers from "../pages/Dashboard/ManageUsers";

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
                Component: PostsDetails
            },
            {
                path: '/membership', 
                Component: Membership
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
        Component: Dashboard,
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
                path: 'announcements',
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