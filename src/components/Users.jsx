import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users on load
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users:", error);
        }
    };

    // Handle Add User
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', newUser);
            alert(response.data.message);
            fetchUsers();
            setShowAddPopup(false);
            setNewUser({ name: '', email: '', password: '', role: 'user' });
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user. Please try again.");
        }
    };

    // Handle Edit User
    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { ...selectedUser };
            if (!updatedData.password) {
                delete updatedData.password; // Do not send password if not updated
            }
            const response = await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, updatedData);
            alert(response.data.message);
            fetchUsers();
            setShowEditPopup(false);
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
        }
    };

    // Handle Delete User
    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${selectedUser.id}`);
            alert(response.data.message);
            fetchUsers();
            setShowDeletePopup(false);
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <button
                onClick={() => setShowAddPopup(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded mb-4 shadow-lg hover:bg-blue-600 transition duration-300"
            >
                Add User
            </button>

            {/* Table of Users */}
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300">ID</th>
                        <th className="px-4 py-2 border border-gray-300">Name</th>
                        <th className="px-4 py-2 border border-gray-300">Email</th>
                        <th className="px-4 py-2 border border-gray-300">Role</th>
                        <th className="px-4 py-2 border border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border border-gray-300">{user.id}</td>
                            <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                            <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                            <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                            <td className="px-4 py-2 border border-gray-300 space-x-2">
                                <button
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowEditPopup(true);
                                    }}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowDeletePopup(true);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add User Popup */}
            {showAddPopup && (
                <PopupForm
                    title="Add User"
                    user={newUser}
                    setUser={setNewUser}
                    onCancel={() => setShowAddPopup(false)}
                    onSubmit={handleAddUser}
                />
            )}

            {/* Edit User Popup */}
            {showEditPopup && selectedUser && (
                <PopupForm
                    title="Edit User"
                    user={selectedUser}
                    setUser={setSelectedUser}
                    onCancel={() => setShowEditPopup(false)}
                    onSubmit={handleEditUser}
                />
            )}

            {/* Delete User Popup */}
            {showDeletePopup && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-lg">
                        <h3 className="text-2xl font-semibold text-center mb-6">Confirm Delete</h3>
                        <p className="text-center mb-6">
                            Are you sure you want to delete <strong>{selectedUser.name}</strong>?
                        </p>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PopupForm = ({ title, user, setUser, onCancel, onSubmit }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-lg">
            <h3 className="text-2xl font-semibold text-center mb-6">{title}</h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Leave blank to keep existing"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default Users;
