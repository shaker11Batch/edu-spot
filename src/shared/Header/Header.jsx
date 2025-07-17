// import { useState, useContext } from "react";
// import { FaHome, FaUserFriends, FaBell, FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { Link, NavLink } from "react-router"; // corrected router import
// import { AuthContext } from "../Context/AuthContext";

// const Header = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogOut = () => {
//     logOut()
//       .then(() => console.log("Log out"))
//       .catch((error) => console.log(error));
//   };

//   return (
//     <nav className="bg-white shadow-md px-4 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-xl font-bold text-blue-600">
//         Education Spot
//         </Link>

//         {/* Hamburger for Mobile */}
//         <div className="md:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//           </button>
//         </div>

//         {/* Nav Links */}
//         <div className={`md:flex items-center gap-6 ${isMenuOpen ? "block" : "hidden"} w-full md:w-auto mt-4 md:mt-0`}>
//           <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center text-gray-700 text-base">
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center gap-1 text-blue-600 font-semibold"
//                     : "flex items-center gap-1 hover:text-blue-500"
//                 }
//               >
//                 <FaHome /> Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/membership"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center gap-1 text-blue-600 font-semibold"
//                     : "flex items-center gap-1 hover:text-blue-500"
//                 }
//               >
//                 <FaUserFriends /> Membership
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/auth-announce"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center gap-1 text-blue-600 font-semibold"
//                     : "flex items-center gap-1 hover:text-blue-500"
//                 }
//               >
//                 <p className="text-red-600 font-bold text-xl absolute ">{0}</p><FaBell /> Announcement
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center gap-1 text-blue-600 font-semibold"
//                     : "flex items-center gap-1 hover:text-blue-500"
//                 }
//               >
//                 <FaHome /> Dashboard
//               </NavLink>
//             </li>
//           </ul>

//           {/* Login/Logout */}
//           <div className="mt-4 md:mt-0 md:ml-4">
//             {user ? (
//               <button
//                 onClick={handleLogOut}
//                 className="btn btn-error btn-sm flex items-center gap-1"
//               >
//                 <FiLogOut className="text-lg" />
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
//               >
//                 <FaSignInAlt className="text-lg" />
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
import { useState, useContext, useRef, useEffect } from "react";
import {
  FaHome,
  FaUserFriends,
  FaBell,
  FaBars,
  FaTimes,
  FaSignInAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router"; // ✅ Correct import
import { AuthContext } from "../Context/AuthContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 py-3 z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Education Spot
        </Link>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"
            } md:flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0`}
        >
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
            <li className="relative">
              <NavLink
                to="/auth-announce"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-1 text-blue-600 font-semibold"
                    : "flex items-center gap-1 hover:text-blue-500"
                }
              >
                <FaBell /> Announcement
              </NavLink>
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                0
              </span>
            </li>

          </ul>

          {/* Auth Actions */}
          <div className="mt-4 md:mt-0 md:ml-6 relative" ref={dropdownRef}>
            {user ? (
              <>
                {/* Profile Image */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 focus:outline-none"
                >
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-50 p-3 space-y-2">
                    <div className="text-sm font-medium text-gray-800">
                      {user.displayName || "User"}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block text-gray-600 hover:text-blue-600 transition text-sm font-bold"
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleLogOut} className="btn bg-[#1A77F2] text-white w-full outline-0 border-[#005fd8]">
              
                      LogOut
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
              >
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
