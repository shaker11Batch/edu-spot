import { useState } from "react";
import { FaTags,  FaThumbsDown, FaClock } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
const Post = ({ post }) => {

  const [upvoteCount, setUpvoteCount] = useState(post.upvote || 0);
  const [downvoteCount, setDownvoteCount] = useState(post.downvote || 0);


  const handleUpvote = async () => {
    await handleVote("upvote"); // Your backend handler
    setUpvoteCount(prev => prev + 1);
  };

  const handleDownvote = async () => {
    await handleVote("downvote"); // Your backend handler
    setDownvoteCount(prev => prev + 1);
  };


  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 my-8">
      <div className="p-5 space-y-3">
        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{post.authorName}</h4>
            <p className="text-sm text-gray-500">{post.authorEmail}</p>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src={post.imageUpload}
            alt={post.authorName}
            className="h-[200px] w-full object-cover"
          />
         

          </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-blue-700">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>

  {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <FaTags className="text-gray-500" />
          {post.tag}
        </div>
      {/* Vote Buttons */}
      <div className="flex gap-6 items-center text-gray-700 text-sm">
        <button
          onClick={handleUpvote}
          className="flex items-center gap-1 hover:text-green-600"
        >
          <FaThumbsUp /> <span>{upvoteCount}</span>
        </button>

        <button
          onClick={handleDownvote}
          className="flex items-center gap-1 hover:text-red-600"
        >
          <FaThumbsDown /> <span>{downvoteCount}</span>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Post;
