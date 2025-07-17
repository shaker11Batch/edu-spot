import { useEffect, useState } from "react";
import { FaUserShield, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure()
    //   const fetchUsers = async () => {
    //     const res = await axiosSecure.get(`/users?search=${searchTerm}`);
    //     setUsers(res.data);
    //   };

    useEffect(() => {
        // fetchUsers()
        axiosSecure('/user')
            .then(result => {
                console.log(result.data)
                setUsers(result?.data)
            })

    }, [axiosSecure]);

    const handleMakeAdmin = async (id) => {
    const admin =    await axiosSecure.patch(`/user/admin/${id}`);
        // fetchUsers();
        console.log(admin)
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            {/* Search Bar */}
            {/* <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <FaSearch className="text-gray-500" />
      </div> */}

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="table w-full bg-white shadow rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-center">Role</th>
                            <th className="py-3 px-4 text-center">Subscription</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 text-center">
                                    {user.role === "admin" ? "Admin" : "User"}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {user.isMember ? "Gold Member" : "Bronze Member"}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                                        >
                                            <FaUserShield /> Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
