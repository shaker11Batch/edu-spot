import React, { use, useEffect, useState } from 'react';

import './AllPost.css'

import Post from './Post';
import { AuthContext } from '../../shared/Context/AuthContext';

const AllPost = () => {
    const {user}= use(AuthContext)
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
        fetch(`http://localhost:5000/posts?page=${currentPage}&size=${itemPerPage}`,{email: user?.email})
            .then(res => res.json())
            .then(data => setPost(data))
    }, [currentPage, itemPerPage])

    return (
        <>   
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3'>
            {
                posts.map(post => <Post post={post}></Post>)
            }

        </div>
            <div className='pagination'>
                {
                    pages.map(page => <button
                        className={currentPage === page && 'selected'}
                        onClick={() => setCurrentPage(page)}
                        key={page}>{page}</button>)
                }
                <select value={itemPerPage} onChange={handleItemPerPage} name="" id="">
                    <option value="6">6</option>
                    <option value="20">20</option>
                    <option value="10">10</option>
                </select>
            </div>
        </>
    );
};

export default AllPost;