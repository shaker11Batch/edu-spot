import { use, useEffect, useState } from "react";
import { FaEnvelope, FaMedal } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RecentThreePosts from "./RecentThreePosts";

const MyProfile = () => {
    const { user} = use(AuthContext)
    const [users, setUsers] = useState([])
const axiosSecure = useAxiosSecure()
    const isMember = user?.isMember; // Boolean from backend or context
    const displayBadge = isMember ? "gold" : "bronze";

    // user profile 

 useEffect(()=>{
    axiosSecure(`/userprofile`)
    .then(res => {
        setUsers(res?.data)
    })
    .catch(error => {
        console.log(error)
    })
 
 },[axiosSecure])

    return (
        <>
        
          
       
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
            {/* User Info */}
          {  users?.map(user =>  <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
                <img
                    src={user?.photo}
                    alt="User"
                    className="w-28 h-28 rounded-full border-4 border-blue-300 object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                    <p className="flex items-center gap-2 text-gray-600 mt-1">
                        <FaEnvelope /> {user?.email}
                    </p>

                    {/* Badges */}
                    <div className="mt-3 flex gap-2">
                        {displayBadge === "gold" ? (
                            <span
                                className='px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 bg-yellow-400 text-white'
                            >
                                <FaMedal /> Gold Member
                            </span>
                        ) : (
                            <span
                                className='px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 bg-yellow-400 text-white'
                            >
                                <FaMedal /> {user?.badge}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            ) }
           

            {/* Recent Posts */}
         <RecentThreePosts/>
        </div>
        </>
    );
};

export default MyProfile;
