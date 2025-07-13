import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../shared/Context/AuthContext";


const Login = () => {
    const {signIn} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        signIn(data.email, data.password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>console.log(error))
        // handle login logic here
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4">
            {/* Left - Form */}
            <div className="md:w-1/2 w-full p-6">
                <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Email with Icon */}
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <FaEnvelope className="text-gray-500" />
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="grow"
                                placeholder="Email"
                            />
                        </label>
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        {/* Password with Icon */}
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <FaLock className="text-gray-500" />
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                                className="grow"
                                placeholder="Password"
                            />
                        </label>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary w-full mt-4">
                            Login
                        </button>
                    </form>

                    {/* New User Redirect */}
                    <p className="text-center text-sm mt-4">
                        New here?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right - Image */}
            <div className="md:w-1/2 w-full p-6">
                <img
                    src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=826"
                    alt="Login Illustration"
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                />
            </div>
        </div>
    );
};

export default Login;
