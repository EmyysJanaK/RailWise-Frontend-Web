import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from backend API
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleAddUser = () => {
    axios.post('/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '', role: 'user' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleEditUser = () => {
    axios.put(`/api/users/${editingUser.id}`, editingUser)
      .then(response => {
        setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
        setEditingUser(null);
      })
      .catch(error => console.error('Error editing user:', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="form-input mb-2"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="form-input mb-2"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="form-input mb-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleAddUser}
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add User
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
        {users.map(user => (
          <div key={user.id} className="mb-4 p-4 border rounded-md shadow-sm flex justify-between items-center">
            {editingUser && editingUser.id === user.id ? (
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                  className="form-input mb-2 mr-2"
                />
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="form-input mb-2 mr-2"
                />
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleEditChange}
                  className="form-input mb-2 mr-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={handleEditUser}
                  className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p>{user.email}</p>
                <p className="text-gray-600">{user.role}</p>
              </div>
            )}
            {!editingUser && (
              <div>
                <button
                  onClick={() => setEditingUser(user)}
                  className="py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
