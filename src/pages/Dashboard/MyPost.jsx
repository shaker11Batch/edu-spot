import { use, useState } from "react";
import { FaCommentDots, FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyPost = () => {
    const [myPosts, setMyPosts] = useState([])
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()

    axiosSecure(`/myPosts?email=${user?.email}`)
        .then(res => {
            setMyPosts(res?.data)
        })
        .catch(error => {
            console.log(error)
        })


    const handleDelete = id => {
        axiosSecure.delete(`/myPosts/${id}`)
            .then(res => {
                console.log(res.data)
                toast('Deleted post')
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-100 text-blue-700">
                    <tr>
                        <th className="py-3 px-4 text-left">Post Title</th>
                        <th className="py-3 px-4 text-center">Votes</th>
                        <th className="py-3 px-4 text-center">Comment</th>
                        <th className="py-3 px-4 text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {myPosts?.map((post) => (
                        <tr
                            key={post._id}
                            className="border-t hover:bg-blue-50 transition-colors"
                        >
                            <td className="py-3 px-4">{post.title}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-600">
                                {post.upVote - post.downVote}
                            </td>
                            <td className="py-3 px-4 text-center">
                                <button
                                    onClick={() => handleComment(post._id)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="View/Add Comments"
                                >
                                    <FaCommentDots size={18} />
                                </button>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="text-red-500 hover:text-red-700"
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
