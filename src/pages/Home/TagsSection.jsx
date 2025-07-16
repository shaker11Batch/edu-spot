import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TagsSection = ({ onTagSelect }) => {
  const [tags, setTags] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/posts/tags") 
      .then(res => setTags(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Browse by Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => onTagSelect(tag)}
            className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
