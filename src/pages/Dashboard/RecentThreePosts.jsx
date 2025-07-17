import { FaTags, FaThumbsUp, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router';

const RecentThreePosts = ({recentPosts}) => {


    return (
        <div className="">
            <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">📝 Recent Posts</h3>
            <div className="space-y-6">
  {recentPosts?.map((post) => (
    <div
      key={post._id}
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
    >
      {/* Author Info */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50">
        <img
          src={post.authorImage}
          alt="Author"
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{post.authorName || "Unknown"}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaCalendarAlt className="text-gray-400" /> {post.createAt}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 py-5 space-y-3">
        <h2 className="text-xl font-bold text-blue-800 hover:underline cursor-pointer">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t text-sm text-gray-700">
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <FaTags /> <span>{post.tag}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <FaThumbsUp /> <span>{post.upVote || 0}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

           
        </div>
    );
};

export default RecentThreePosts;