import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../shared/Context/AuthContext';

const RecentThreePosts = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [recentPosts, setRecentPosts] = useState([])

  useEffect(()=>{
    axiosSecure(`/recentPosts?email=${user?.email}`)
    .then(res => {
        console.log(res?.data)
        setRecentPosts(res?.data)
    })
    .catch(error => {
        console.log(error)
    })

  },[axiosSecure])
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">📝 Recent Posts</h3>
            <div className="space-y-4">
                {recentPosts?.map((post) => (
                    <div
                        key={post._id}
                        className="bg-gray-50 border rounded-lg p-4 hover:shadow-md transition"
                    >
                        <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                        <p className="text-sm text-gray-600">Tag: {post.tag}</p>
                        <p className="text-sm text-gray-500">
                            Votes: {post.upVote - post.downVote} | Date: {post.createAt}
                        </p>
                        <Link
                            to={`/post/${post._id}`}
                            className="text-blue-500 text-sm hover:underline mt-2 inline-block"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentThreePosts;