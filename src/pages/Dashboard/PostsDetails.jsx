import { use, useEffect, useState } from "react";
import { useParams } from "react-router";

import { FaTags, FaClock } from "react-icons/fa";

import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Comments from "./Comments";
import useAuth from "../../hooks/useAuth";


const PostDetails = () => {
  const { user, } = use(AuthContext);
  console.log(user.accessToken)
  const { id } = useParams();
  const [postCom, setPostCom] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(post?.upVote?.includes(user.email))
  const [likeCount, setLikeCount] = useState(post?.upVote.length || 0)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // const shareUrl = `${window.location.origin}/post/${id}`;
  const axiosSecure = useAxiosSecure()


  useEffect(() => {
    axiosSecure.get(`/posts/${id}`
      )
    .then((res) => setPost(res.data));
    setLoading(false)

  }, [id, post ]);

  useEffect(()=>{
    axiosSecure(`/comments/${post?._id}`)
      .then(res => {
        setPostCom(res.data)
        console.log(res.data)
      })
  },[post])

  const handleLike = () => {
    if (user.email === post.authorEmail) {
      alert('lojja kore na')
    }
    else {
      axiosSecure.patch(`/like/${post?._id}`, { email: user?.email })
        .then(res => {
          console.log(res.data)
          const isLiked = res?.data?.liked
          setLiked(isLiked)
          setLikeCount(prev => isLiked ? prev + 1 : prev - 1)
        }).catch(error => {
          console.log(error)
        })
    }
  }



  const handleComment = async () => {
    if (!user || !comment.trim()) return;
    const newComment = {
      name: user?.displayName,
      title: post.title,
      photo: user.photoURL,
      email: user.email,
      comment,
      postId: id,
      time: new Date().toISOString(),
    };
    await axiosSecure.post(`/comments`, newComment);
    setComments([...comments, newComment]);
    setComment('')
  };

  // if (!post || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <img src={post?.authorImage} alt="Author" className="w-14 h-14 rounded-full shadow" />
          <div>
            <h4 className="text-xl font-bold text-blue-700">{post?.authorName}</h4>
            <p className="text-sm text-gray-500 flex items-center gap-1"><FaClock /> {post?.createAt}</p>
          </div>
        </div>
        <img src={post?.imageUpload} alt="" className="h-[400px] w-full object-cover" />
        <h2 className="text-3xl font-extrabold mb-3 text-gray-800 mt-3.5">{post?.title}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{post?.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
          <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            <FaTags className="mr-1" /> {post?.tag}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}

            className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-sm
        ${liked ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100 text-blue-600"}
        border border-blue-200 hover:shadow-md`}
          >
            <span className={`text-xl transition-transform ${liked ? "scale-110 animate-ping-once" : ""}`}>
              👍
            </span>
            <span className="font-semibold text-sm">{likeCount}</span>
          </button>

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

          <Comments postCom={postCom}></Comments>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

