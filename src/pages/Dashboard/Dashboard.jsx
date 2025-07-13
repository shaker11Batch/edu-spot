import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaUser, FaPlusCircle, FaListAlt, FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-white shadow px-4 py-3">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-md p-6 space-y-4`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-600 font-semibold"
                  : "flex items-center gap-2 hover:text-blue-500"
              }
              onClick={() => setSidebarOpen(false)}
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-post"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-600 font-semibold"
                  : "flex items-center gap-2 hover:text-blue-500"
              }
              onClick={() => setSidebarOpen(false)}
            >
              <FaPlusCircle /> Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-posts"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-600 font-semibold"
                  : "flex items-center gap-2 hover:text-blue-500"
              }
              onClick={() => setSidebarOpen(false)}
            >
              <FaListAlt /> My Posts
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
