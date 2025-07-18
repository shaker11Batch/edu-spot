import React, { use, useEffect, useState } from 'react';

import './AllPost.css'

import Post from './Post';
import { AuthContext } from '../../shared/Context/AuthContext';

const AllPost = () => {
  const { user } = use(AuthContext)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)
  const [count, setCount] = useState(0)
  // const count =50

  const numOfPages = Math.ceil(count / itemPerPage)

  const pages = [...Array(numOfPages).keys()]
  // console.log(pages)

  useEffect(() => {
    fetch('http://localhost:5000/productsCount')
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])

  const handleItemPerPage = e => {

    const val = parseInt(e.target.value)
    console.log(val)
    setItemPerPage(val)
    setCurrentPage(0)
  }

  // -------------------/

  const [posts, setPost] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/posts?page=${currentPage}&size=${itemPerPage}`, { email: user?.email })
      .then(res => res.json())
      .then(data => setPost(data))
  }, [currentPage, itemPerPage])

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {
          posts.map(post => <Post post={post}></Post>)
        }

      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 mb-4">
        {/* Pagination Buttons */}
        <div className="flex flex-wrap gap-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border transition duration-200 ${currentPage === page
                  ? "bg-blue-600 text-white font-semibold border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Item Per Page Selector */}
        <div className="flex items-center gap-2">
          <select
            id="perPage"
            value={itemPerPage}
            onChange={handleItemPerPage}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

    </>
  );
};

export default AllPost;