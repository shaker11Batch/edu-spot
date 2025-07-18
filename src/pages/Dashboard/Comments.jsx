import React, { useEffect, useState } from 'react';


const Comments = ({postCom}) => {



    return (
        <div className="space-y-4">
        
        {postCom.map((cmt, index) => (
         <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border">
       {/* User photo */}
       <img
         src={cmt?.photo}
         alt={name}
         className="w-10 h-10 rounded-full object-cover border"
       />
 
       {/* Comment content */}
       <div className="flex-1">
         <div className="flex items-center justify-between">
           <h4 className="font-semibold text-gray-800">{cmt?.name}</h4>
           <span className="text-sm text-gray-500">
             {cmt.time}
           </span>
         </div>
         <p className="mt-1 text-gray-700">{cmt?.comment}</p>
       </div>
     </div>
        ))}
      </div>
    );
};

export default Comments;