import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="animate-spin text-blue-600 text-6xl drop-shadow-lg">
        <FaSpinner />
      </div>
      <p className="mt-4 text-lg text-gray-600 font-semibold animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;
