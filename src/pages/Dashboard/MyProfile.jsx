import { use, useEffect, useState } from "react";
import { FaEnvelope, FaMedal } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RecentThreePosts from "./RecentThreePosts";

const MyProfile = () => {
    const { user } = use(AuthContext)
    const [users, setUsers] = useState([])
    const [recentPosts, setRecentPosts] = useState([])
    const axiosSecure = useAxiosSecure()
    const isMember = user?.isMember; // Boolean from backend or context
    const displayBadge = isMember ? "gold" : "bronze";

    // user profile 

    useEffect(() => {
        axiosSecure(`/userprofile/${user?.email}`)
            .then(res => {
                setUsers(res?.data)
            })
            .catch(error => {
                console.log(error)
            })


        axiosSecure(`/recentPosts/${user?.email}`)
            .then(res => {
                setRecentPosts(res.data)
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [axiosSecure, user])

    return (
        <>

<div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl text-center">
  {/* User Info */}
  <div className="flex flex-col items-center border-b pb-6">
    <img
      src={users?.photo}
      alt="User"
      className="w-28 h-28 rounded-full border-4 border-blue-300 object-cover mb-4"
    />

    <h2 className="text-2xl font-bold text-gray-800">{users?.name}</h2>

    <p className="flex items-center justify-center gap-2 text-gray-600 mt-1">
      <FaEnvelope /> {users?.email}
    </p>

    {/* Badges */}
    <div className="mt-4">
  {users?.role === "admin" ? (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
      💎 Diamond Admin
    </span>
  ) : displayBadge === "gold" ? (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400 text-white">
      <FaMedal /> Gold Member
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white">
      <FaMedal /> {users?.badge || "Bronze"}
    </span>
  )}
</div>

  </div>

  {/* Recent Posts */}
  <div className="mt-6">
    <RecentThreePosts recentPosts={recentPosts} />
  </div>
</div>

        </>
    );
};

export default MyProfile;
