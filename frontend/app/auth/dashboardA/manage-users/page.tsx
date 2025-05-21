/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from 'components/Navbar'; // Import Navbar component
import { getCookie } from 'cookies-next';

const backend_url = 'http://localhost:3001/users';

type User = {
  id: string;
  name: string;
  email: string;
  role: string; // 'student' or 'instructor'
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
const userId = getCookie("userId");
  const fetchUsers = async () => {
    if (loading) return; // Prevent redundant fetches
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backend_url}/all`, { withCredentials: true });
      const mappedUsers = response.data.map((user: any) => ({
        id: user._id, // Map _id to id
        name: user.name,
        email: user.email,
        role: user.role,
      }));
      console.log('Mapped Users:', mappedUsers);
      setUsers(mappedUsers);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    setLoading(true); // Signal loading to avoid triggering re-renders
    try {
      await axios.delete(`${backend_url}/delete/${id}`, { withCredentials: true });
      alert('User deleted successfully');
      await fetchUsers(); // Refresh user list
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <>
      {/* Navbar added here */}
      <Navbar userId={userId}/>

      <div className="min-h-screen bg-gray-100 p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-600">View and delete users from the system.</p>
        </header>

        {error && <p className="text-red-500">{error}</p>}
        {loading && <p>Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div key={user.id || index} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 capitalize">{user.role}</p>
              <div className="mt-4">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
