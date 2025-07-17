import { use, useEffect, useState } from "react";
import { useParams } from "react-router";

import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaTags, FaClock } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = use(AuthContext);
  const shareUrl = `${window.location.origin}/post/${id}`;
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get(`/posts/${id}`).then((res) => setPost(res.data));

  }, [id, post]);




  const handleVote = async (type) => {
    if (!user) return alert("Login required to vote");
    await axiosSecure.patch(`/posts/${id}/${type}`, { email: user.email }).then((res) => {
      setPost(res.data);
    });
  };

  const handleComment = async () => {
    if (!user || !comment.trim()) return;
    const newComment = {
      email: user.email,
      comment,
      postId: id,
      time: new Date().toISOString(),
    };
    await axiosSecure.post(`/comments`, newComment);
    setComments([...comments, newComment]);
    setComment("");
  };

  if (!post) return <p className="text-center py-10 text-lg font-semibold">Loading post details...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <img src={post.authorImage} alt="Author" className="w-14 h-14 rounded-full shadow" />
          <div>
            <h4 className="text-xl font-bold text-blue-700">{post.authorName}</h4>
            <p className="text-sm text-gray-500 flex items-center gap-1"><FaClock /> {post.createAt}</p>
          </div>
        </div>
        <img src={post.imageUpload} alt="" className="h-[400px] w-full object-cover" />
        <h2 className="text-3xl font-extrabold mb-3 text-gray-800 mt-3.5">{post.title}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{post.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
          <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            <FaTags className="mr-1" /> {post.tag}
          </span>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <button onClick={() => handleVote("upvote")} className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800">
            <FaThumbsUp className="text-xl" /> {post.upvote || 0}
          </button>
          <button onClick={() => handleVote("downvote")} className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-700">
            <FaThumbsDown className="text-xl" /> {post.downvote || 0}
          </button>
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
          {user ? (
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Write a thoughtful comment..."
              ></textarea>
              <button onClick={handleComment} className="btn btn-primary">Submit Comment</button>
            </div>
          ) : (
            <p className="text-gray-500 italic">Please log in to comment.</p>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

