import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div
      className="hero min-h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-50"></div>
      <div className="text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="mb-6 text-lg md:text-xl">Find what you’re looking for in seconds.</p>

        {/* Search Input */}
        <div className="flex justify-center">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-md bg-white text-black">
            <FaSearch className="text-gray-500" />
            <input type="text" className="grow" placeholder="Search..." />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Banner;
