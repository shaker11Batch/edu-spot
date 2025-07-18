import { useEffect, useState } from "react";
import { FaUserShield, FaSearch, FaMedal, FaGem, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure()


    useEffect(() => {

        axiosSecure('/user')
            .then(result => {
                console.log(result.data)
                setUsers(result?.data)
            })

    }, [axiosSecure]);

    const handleMakeAdmin = async (id) => {
        const admin = await axiosSecure.patch(`/user/admin/${id}`);
        console.log(admin)
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="table w-full bg-white shadow rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">SL</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-center">Role</th>
                            <th className="py-3 px-4 text-center">Subscription</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, inx) => (
                            <tr key={user._id} className="border-t">
                                <td className="py-3 px-4">{inx + 1}</td>
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 text-center">
                                    {user.role === "admin" ? "Admin" : "User"}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {user.badge === "gold" && (
                                        <span className="flex items-center justify-center gap-1 text-yellow-500 font-semibold">
                                            <FaMedal /> Gold
                                        </span>
                                    )}
                                    {user.badge === "Diamonds" && (
                                        <span className="flex items-center justify-center gap-1 text-blue-500 font-semibold">
                                            <FaGem /> Diamond
                                        </span>
                                    )}
                                    {user.badge === "Bronze" && (
                                        <span className="flex items-center justify-center gap-1 text-orange-500 font-semibold">
                                            <FaStar /> Bronze
                                        </span>
                                    )}
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
