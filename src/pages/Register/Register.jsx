import { useForm } from "react-hook-form";
import { FaUser, FaImage, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

import { use, useState } from "react";
import { AuthContext } from "../../shared/Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
    const [profilePic, setProfilePic] = useState('')
    const { createUser, setUser, googleLogIn } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Registered Data:", data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                navigate('/')
                // update profile 
                const profile = { displayName: data?.name, photoURL: profilePic }
                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log('user profile update')

                        setUser(...user, profile)

                    })
                    .catch(error => console.log(error))

                // user add database with role 
                const userInfo = {
                    name: data?.name,
                    photo: profilePic,
                    email: data?.email,
                    badge: "Bronze",
                    role: "user",
                    createdAt: new Date().toLocaleString()
                }

                axiosSecure.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                        // if(res?.data?.)

                    }).catch(error => console.log(error))
                toast.success("🎉 Registration Successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            })
            .catch(error => console.log(error))
        reset();
    };


    const handleGoogleSignUp = () => {
        googleLogIn()
          .then(result => {
            const user = result.user;
            const userInfo = {
              name: user.displayName,
              photo: user.photoURL,
              email: user.email,
              badge: "Bronze",
              role: "user",
              createdAt: new Date().toLocaleString()
            };
      
            axiosSecure.post('/user', userInfo)
              .then(res => {
                console.log("Google user saved:", res.data);
                toast.success("🎉 Logged in with Google!", { autoClose: 3000 });
                navigate('/');
              }).catch(err => console.log(err));
          })
          .catch(err => {
            console.error("Google Sign-in Error:", err);
            toast.error("Google sign-in failed");
          });
      };
      


   


    const handleImageUpload = async e => {
        const image = e.target?.files[0];
        console.log(image)
        const fromData = new FormData();
        fromData.append('image', image)

        const imageUploadURL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadURL, fromData)
        setProfilePic(res.data.data.url)

    }

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
                                    type="file"
                                    onChange={handleImageUpload}
                                    // {...register("photoURL", { required: "Photo URL is required" })}
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

                    <div className="mt-4">
                        <button
                            onClick={handleGoogleSignUp}
                            className="btn w-full flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white"
                        >
                            <FaGoogle className="text-lg" />
                            Sign up with Google
                        </button>
                    </div>

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
