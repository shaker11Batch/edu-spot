import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SearchResult from "./SearchResult";

const Banner = () => {
  const axiosSecure = useAxiosSecure()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {

    axiosSecure(`posts/search?query=${query}`)
      .then(result => {
        console.log(result.data)
        setResults(result?.data);
      })
   
  };

  return (
    <>
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
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="grow"
                placeholder="Search..." />
            </label>
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>

      </div>
      {/* search result */}
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(result => <SearchResult result={result} key={result._id}></SearchResult>)
        }

      </div>
    </>

  );
};

export default Banner;
