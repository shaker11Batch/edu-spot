import { useState, useContext } from "react";
import { FaHome, FaUserFriends, FaBell, FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router"; // corrected router import
import { AuthContext } from "../Context/AuthContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Log out"))
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
        Education Spot
        </Link>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Nav Links */}
        <div className={`md:flex items-center gap-6 ${isMenuOpen ? "block" : "hidden"} w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center text-gray-700 text-base">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-1 text-blue-600 font-semibold"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/membership"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-1 text-blue-600 font-semibold"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <FaUserFriends /> Membership
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-1 text-blue-600 font-semibold"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <p className="text-red-600 font-bold text-xl absolute ">{0}</p><FaBell /> Announcement
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-1 text-blue-600 font-semibold"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <FaHome /> Dashboard
              </NavLink>
            </li>
          </ul>

          {/* Login/Logout */}
          <div className="mt-4 md:mt-0 md:ml-4">
            {user ? (
              <button
                onClick={handleLogOut}
                className="btn btn-error btn-sm flex items-center gap-1"
              >
                <FiLogOut className="text-lg" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
              >
                <FaSignInAlt className="text-lg" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
