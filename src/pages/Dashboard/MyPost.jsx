import { use, useEffect, useState } from "react";
import { FaTrashAlt, FaCommentDots, FaHeart, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyPost = () => {
    const [myPosts, setMyPosts] = useState([])
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()

   useEffect(()=>{
    axiosSecure(`/myPosts?email=${user?.email}`)
    .then(res => {
        setMyPosts(res?.data)
    })
    .catch(error => {
        console.log(error)
    })
   },[axiosSecure])


    const handleDelete = id => {
        axiosSecure.delete(`/myPosts/${id}`)
            .then(res => {
                console.log(res.data)
                toast('Deleted post')
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="overflow-x-auto mt-10">
      <table className="min-w-full table-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800">
          <tr>
            <th className="py-4 px-6 text-left font-semibold">📌 Title</th>
            <th className="py-4 px-6 text-center font-semibold">💬 Comments</th>
            <th className="py-4 px-6 text-center font-semibold">❤️ Votes</th>
            <th className="py-4 px-6 text-center font-semibold">📅 Date</th>
            <th className="py-4 px-6 text-center font-semibold">🗑️ Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {myPosts?.map((post) => (
            <tr
              key={post._id}
              className="border-b hover:bg-blue-50 transition-all duration-300"
            >
              <td className="py-3 px-6 font-medium">{post.title}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleComment(post._id)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Comment"
                >
                  <FaCommentDots size={18} />
                </button>
              </td>
              <td className="py-3 px-6 text-center text-green-600 font-semibold flex justify-center items-center gap-1">
                <FaHeart className="text-red-500" />{" "}
                {post.upVote - post.downVote}
              </td>
              <td className="py-3 px-6 text-center text-sm text-gray-500">
                <div className="flex justify-center items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  {post.createAt}
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete Post"
                >
                  <FaTrashAlt size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default MyPost;
