import { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AnnouncementForm = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Announcement Data:", data);
        // send to server
        axiosSecure.post('/announcement', data)
            .then(res => {
                console.log(res.data)
            }).catch(error => console.log(error))

        // reset();
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Announcement</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Author Image URL */}
                <div>
                    <label className="block font-semibold mb-1">Author Image URL</label>
                    <input
                        type=""
                        value={user?.photoURL}
                        placeholder="https://example.com/author.jpg"
                        {...register("authorImage", { required: "Image URL is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.authorImage && <p className="text-red-500 text-sm">{errors.authorImage.message}</p>}
                </div>

                {/* Author Name */}
                <div>
                    <label className="block font-semibold mb-1">Author Name</label>
                    <input
                        type="text"
                        value={user?.displayName}

                        placeholder="Enter author name"
                        {...register("authorName", { required: "Author name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
                </div>

                {/* Author Email */}
                <div>
                    <label className="block font-semibold mb-1">Author Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        placeholder="example@email.com"
                        {...register("authorEmail", { required: "Email is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.authorEmail && <p className="text-red-500 text-sm">{errors.authorEmail.message}</p>}
                </div>

                {/* Announcement Title */}
                <div>
                    <label className="block font-semibold mb-1">Announcement Title</label>
                    <input
                        type="text"
                        placeholder="Title of announcement"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Announcement Image URL */}
                <div>
                    <label className="block font-semibold mb-1">Announcement Image URL</label>
                    <input
                        type="text"
                        placeholder="https://example.com/announcement.jpg"
                        {...register("announcementImage", { required: "Announcement image is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.announcementImage && <p className="text-red-500 text-sm">{errors.announcementImage.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        rows="5"
                        placeholder="Write the announcement description..."
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Publish Announcement
                </button>
            </form>
        </div>
    );
};

export default AnnouncementForm;
