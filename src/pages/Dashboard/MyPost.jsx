import { use, useEffect, useState } from "react";
import { FaTrashAlt, FaCommentDots, FaHeart, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyPost = () => {
    const [myPosts, setMyPosts] = useState([])
    const [postLoading, setPostLoading] = useState(true) 
    const { user, loading } = use(AuthContext)
    const axiosSecure = useAxiosSecure()

   useEffect(()=>{
    axiosSecure(`/myPosts?email=${user?.email}`)
    .then(res => {
        setMyPosts(res?.data)
        setPostLoading(false)
    })
    .catch(error => {
        console.log(error)
    })
   },[axiosSecure])


 
      

    const handleDelete = (id) => {
      console.log('deleted by id', id)

      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {

          if (result.isConfirmed) {
              axiosSecure.delete(`/myPosts/${id}`)
                  .then(res => {
                      console.log(res)
                      if (res?.data?.deletedCount) {
                          Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success"
                          });
                      }
                  })
          }

          
          const remainingPost = myPosts.filter(post => post._id !== id)
          setMyPosts(remainingPost)
      });
  }


    if(postLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="overflow-x-auto mt-10">
      <table className="min-w-full table-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800">
          <tr>
            <th className="py-4 px-6 text-left font-semibold">📌 Title</th>
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
             
              <td className="py-3 px-6 text-center text-green-600 font-semibold flex justify-center items-center gap-1">
                <FaHeart className="text-red-500" />{" "}
                {post.upVote.length +1}
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
