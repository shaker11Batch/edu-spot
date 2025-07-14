import { useState } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import AnnouncementCard from "./AnnouncementCard";




const AnnouncementList = () => {
const axiosSecure = useAxiosSecure()

    const [announcements, setAnnouncements] = useState([])

    axiosSecure('/announcement')
    .then(res =>{
        console.log(res.data)
        setAnnouncements(res?.data)
    }).catch(error =>console.log(error))

  return (
    <div className="px-4 py-10">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement._id} announcement={announcement} />
      ))}
    </div>
  );
};

export default AnnouncementList;
