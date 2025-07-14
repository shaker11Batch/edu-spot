const AnnouncementCard = ({ announcement }) => {
    const {
      authorImage,
      authorName,
      authorEmail,
      title,
      announcementImage,
      description,
      createAt,
    } = announcement;
  
    return (
      <div className="bg-white rounded-xl shadow-md p-5 max-w-3xl mx-auto my-6">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-12 h-12 rounded-full object-cover border"
            onError={(e) => (e.target.src = "https://i.ibb.co/JFscYbY/default-user.png")}
          />
          <div>
            <h3 className="font-bold text-lg">{authorName}</h3>
            <p className="text-sm text-gray-500">{authorEmail}</p>
            <p className="text-xs text-gray-400">📅 {createAt}</p>
          </div>
        </div>
  
        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-600 mb-2">{title}</h2>
  
        {/* Announcement Image */}
        {announcementImage && (
          <img
            src={announcementImage}
            alt={title}
            className="w-full h-auto rounded-lg object-cover mb-4"
            onError={(e) => (e.target.src = "https://i.ibb.co/GsxBqmg/default-announcement.jpg")}
          />
        )}
  
        {/* Description */}
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    );
  };
  
  export default AnnouncementCard;
  