import { useForm } from "react-hook-form";
import { FaUser, FaImage, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Registered Data:", data);
        reset();
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
            {/* Image Section */}
            <div className="md:w-1/2 w-full p-6">
                <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7872.jpg?w=826"
                    alt="Create Account"
                    className="w-full h-auto object-cover rounded-xl shadow-lg" />

            </div>

            {/* Form Section */}
            <div className="md:w-1/2 w-full p-6">
                <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <label className="form-control w-full">
                            <span className="label-text mb-1">Name</span>
                            <div className="input input-bordered flex items-center gap-2">
                                <FaUser />
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="grow"
                                    placeholder="Enter your name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </label>

                        {/* Photo URL */}
                        <label className="form-control w-full">
                            <span className="label-text mb-1">Photo URL</span>
                            <div className="input input-bordered flex items-center gap-2">
                                <FaImage />
                                <input
                                    type="text"
                                    {...register("photoURL", { required: "Photo URL is required" })}
                                    className="grow"
                                    placeholder="Paste photo URL"
                                />
                            </div>
                            {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
                        </label>

                        {/* Email */}
                        <label className="form-control w-full">
                            <span className="label-text mb-1">Email</span>
                            <div className="input input-bordered flex items-center gap-2">
                                <FaEnvelope />
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="grow"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </label>

                        {/* Password */}
                        <label className="form-control w-full">
                            <span className="label-text mb-1">Password</span>
                            <div className="input input-bordered flex items-center gap-2">
                                <FaLock />
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" },
                                    })}
                                    className="grow"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </label>

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary w-full mt-4">
                            Sign Up
                        </button>
                    </form>
                    {/* New User Redirect */}
                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Please Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
