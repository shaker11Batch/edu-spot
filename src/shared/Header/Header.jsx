import React, { use } from 'react';
import { FaSignInAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../../Firebase/firebase.init';

const Header = () => {
    const { user, logOut } = use(AuthContext)

    const handleLogOut = () => {
        logOut(auth)
            .then(() => console.log('log out'))
            .catch(error => console.log(error))
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">

                {
                    user ? <button
                        onClick={handleLogOut}
                        className="btn btn-error btn-sm flex items-center gap-1"
                    >
                        <FiLogOut className="text-lg" />
                        Logout
                    </button>
                        : <Link to="/login" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition">
                            <FaSignInAlt className="text-lg" />
                            Login
                        </Link>

                }

            </div>
        </div >
    );
};

export default Header;