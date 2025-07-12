import { Link } from "react-router";


const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white text-center">
      {/* Illustration */}
      <img
        src="https://img.freepik.com/free-vector/website-error-404-page-lost-concept-illustration_114360-7903.jpg?w=826"
        alt="Page Not Found"
        className="max-w-md w-full mb-8"
      />

      {/* Error Text */}
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-sm">
        Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Back Home Button */}
      <Link to="/">
        <button className="btn btn-neutral px-6">Back to Home</button>
      </Link>
    </div>
  );
};

export default Error;
