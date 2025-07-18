
import { use, useState } from "react";
import { FaCalendarAlt, FaTags, FaThumbsDown } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../../shared/Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";
const Post = ({ post }) => {



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
        <div className="flex gap-6 items-center justify-between text-gray-700 text-sm">
          <p className="flex items-center gap-1 text-gray-500 text-sm">
            <FaCalendarAlt className="text-blue-500" />
            {post.createAt}
          </p>
          <div className="flex  justify-between">
            <Link to={`/posts/${post._id}`}>
              <button

                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition duration-200"
              >
                <FaInfoCircle className="text-white" />
                <span>Details</span>
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
