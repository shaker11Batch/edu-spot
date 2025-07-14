import { use } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../shared/Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const tagOptions = [
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "sports", label: "Sports" },
  { value: "others", label: "Others" },
];

const AddPost = () => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const postData = {
      ...data,
      tag: data.tag?.value || "",
      upVote: 0,
      downVote: 0,
    };
    console.log("Post Data:", postData);
    // Submit to backend here

axiosSecure.post('/teachers', postData)
.then(res =>{
    console.log(res.data)
})
.catch(error=>console.log(error))
    // reset();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10 mb-10 w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Create a Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Author Image */}
        <div className="col-span-1">
          <label className="label">Author Image URL</label>
          <input
            type="text"
            {...register("authorImage", { required: "Author image is required" })}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
          {errors.authorImage && <p className="text-red-500 text-sm">{errors.authorImage.message}</p>}
        </div>

        {/* Author Name */}
        <div className="col-span-1">
          <label className="label">Author Name</label>
          <input
            type="text"
            {...register("authorName", { required: "Author name is required" })}
            className="input input-bordered w-full"
            placeholder="John Doe"
          />
          {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
        </div>

        {/* Author Email */}
        <div className="col-span-1">
          <label className="label">Author Email</label>
          <input
            type="email"
            value={user?.email}
            {...register("authorEmail", { required: "Author email is required" })}
            className="input input-bordered w-full"
            placeholder="john@example.com"
          />
          {errors.authorEmail && <p className="text-red-500 text-sm">{errors.authorEmail.message}</p>}
        </div>

        {/* Post Title */}
        <div className="col-span-1">
          <label className="label">Post Title</label>
          <input
            type="text"
            {...register("title", { required: "Post title is required" })}
            className="input input-bordered w-full"
            placeholder="Amazing Post Title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Post Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="label">Post Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Write your post description here..."
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Tag - react-select */}
        <div className="col-span-1">
          <label className="label">Tag</label>
          <Controller
            name="tag"
            control={control}
            render={({ field }) => <Select {...field} options={tagOptions} placeholder="Select a tag" />}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button className="btn btn-primary w-full md:w-1/2" type="submit">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
