import { useNavigate } from 'react-router';

const TagsSection = () => {

  const tags = [
    { name: "Education", image: "/images/education.png" },
    { name: "Health", image: "/images/health.png" },
    { name: "Technology", image: "/images/tech.png" },
    { name: "Environment", image: "/images/environment.png" },
    { name: "Science", image: "/images/science.png" },
    { name: "Social", image: "/images/social.png" },
  ];


  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Explore by Tags</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tags.map((tag) => (
          <div
            key={tag.name}
            // onClick={() => handleTagClick(tag.name)}
            className="cursor-pointer bg-white shadow hover:shadow-lg transition p-4 rounded-xl flex flex-col items-center text-center hover:bg-blue-50"
          >
            {/* <img
              src={tag.image}
              alt={tag.name}
              className="w-16 h-16 object-cover mb-2 rounded-full"
            /> */}
            <span className="text-sm font-medium text-gray-700">#{tag.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TagsSection;

