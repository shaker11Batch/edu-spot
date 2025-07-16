import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaTags } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from '../../shared/Context/AuthContext';

const PostsDetails = () => {
    const {user} = use(AuthContext)
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const {id }= useParams()
    // console.log(id)
    const axiosSecure = useAxiosSecure()
    useEffect(() => {

        axiosSecure(`/posts/${id}`)
            .then(res => {
                console.log(res.data)
                setPost(res?.data)
            }).catch(error => console.log(error))

    }, [axiosSecure])

    //     axiosSecure(`/posts/${id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setPost(res?.data)
    //         }).catch(error => console.log(error))

    // }, [axiosSecure])


    const handleVote = async (type) => {
        if (!user) return alert("Login required to vote");
        await axiosSecure.patch(`/posts/${id}/${type}`, {email: user?.email })
        .then((res) => {
            console.log(res.data)
          setPost(res.data);
        });
      };
    
      const handleComment = async () => {
        if (!user || !comment.trim()) return;
        const newComment = {
          email: user.email,
          comment,
          title: post.title,
          postId: id,
          time: new Date().toLocaleDateString(),
        };
        await axiosSecure.post(`/comments`, newComment);
        setComments([...comments, newComment]);
        setComment("");
      };
    
      if (!post) return <p className="text-center py-10">Loading...</p>;
    


    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <img src={post.authorImage} alt="Author" className="w-12 h-12 rounded-full" />
            <div>
              <h4 className="text-lg font-semibold">{post.authorName}</h4>
              <p className="text-sm text-gray-500">{post.createAt}</p>
            </div>
          </div>
  
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.description}</p>
  
          <div className="flex items-center gap-2 mb-4 text-sm">
            <FaTags className="text-gray-500" /> <span>{post.tag}</span>
          </div>
  
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => handleVote("upvote")} className="flex items-center gap-1 text-green-600">
              <FaThumbsUp /> {post.upvote || 0}
            </button>
             <button onClick={() => handleVote("downvote")} className="flex items-center gap-1 text-red-500">
              <FaThumbsDown /> {post.downvote || 0}
            </button> 
  
            {/* <FacebookShareButton url={shareUrl} quote={post.title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton> */}
          </div>
  
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {user ? (
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full mb-2"
                  placeholder="Write a comment..."
                ></textarea>
                <button onClick={handleComment} className="btn btn-primary">Submit Comment</button>
              </div>
            ) : (
              <p className="text-gray-500">Please log in to comment.</p>
            )}
  
            <div className="space-y-3 mt-4">
              {comments.map((cmt, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded">
                  {/* <p className="text-sm font-medium">{cmt.email}</p> */}
                  <p className="text-sm">{cmt.comment}</p>
                  <p className="text-xs text-gray-500">{new Date(cmt.time).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default PostsDetails;