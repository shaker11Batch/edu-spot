import React from 'react';
import { FaClock, FaTags } from 'react-icons/fa';

const SearchResult = ({result}) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 my-8">
        <div className="p-5 space-y-3">
          {/* Author */}
          <div className="flex items-center gap-4">
            <img
              src={result.imageUpload}
              alt={result.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{result.authorName}</h4>
              <p className="text-sm text-gray-500">{result.authorEmail}</p>
            </div>
          </div>
  
          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-blue-700">
            {result.title}
          </h2>
  
          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {result.description}
          </p>
  
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <FaTags className="text-gray-500" />
            {result.tag}
          </div>
  
          {/* Footer Info */}
          <div className="flex justify-between items-center pt-2 border-t mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              {/* <FaThumbsUp /> {result.upVote}
              <FaThumbsDown /> {result.downVote} */}
              <span className="font-semibold text-blue-600 ml-2">
                {/* Total Vote: {totalVote} */}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock />
              {result.createAt}
            </div>
          </div>
        </div>
      </div>
    );
};

export default SearchResult;