import React from 'react';

const Comments = () => {
    return (
        <div className="space-y-4">
        {comments.map((cmt, index) => (
          <div key={index} className="bg-gray-100 border rounded-xl p-4">
            <p className="font-medium text-blue-800">{cmt.name}</p>
            <p className="text-gray-700">{cmt.comment}</p>
            <p className="text-xs text-gray-400">{new Date(cmt.time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
};

export default Comments;