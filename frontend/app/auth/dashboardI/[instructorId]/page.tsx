'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getCookie, getCookies } from 'cookies-next/client';
import { usePathname } from 'next/navigation';
import Navbar from 'components/Navbar'; // Import the Navbar component
import InstructorSidebar from 'components/InstructorSidebar';

type User = {
  name: string;
  email: string;
};

export default function InstructorDashboard() {
  const path = usePathname().split('/');

  const getInstructorData = async () => {
    const instructor = path[path.length - 1];
    const res = await fetch('http://localhost:3001/users/fetch/' + instructor, { credentials: 'include' });
    return res.json();
  };

  const [isInstructor, setIsInstructor] = useState(false); // To track if the user is an instructor
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [updateForm, setUpdateForm] = useState({ name: '', email: '' });
  const [updateMessage, setUpdateMessage] = useState('');
  const [searchError, setSearchError] = useState('');
  const [updateError, setUpdateError] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const role = getCookie("role");
  console.log("Role fetched: " + role);

  const userId = getCookie("userId");
  console.log("User ID: " + userId);

  useEffect(() => {
    console.log('All cookies are ' + JSON.stringify(getCookies()));
    const role = getCookie('role');
    console.log("Role: ", role);
    if (role === 'instructor') {
      setIsInstructor(true);
    } else {
      setError('You are not authorized to view this page.');
    }
  }, []);

  const searchByEmail = async () => {
    if (!searchTerm) {
      setSearchError('Please enter an email to search.');
      return;
    }

    setLoading(true);
    setSearchError(''); // Clear previous search errors
    setSearchResult(null);

    try {
      const res = await axios.get(
        `http://localhost:3001/users/by-email?email=${searchTerm}`,
        { withCredentials: true }
      );
      if (res.status !== 200) {
        throw new Error(`Failed to fetch user: ${res.status}`);
      }
      const userData = res.data;
      setSearchResult(userData);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setSearchError(err.response.data.message || 'An error occurred');
      } else {
        setSearchError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!updateForm.name && !updateForm.email) {
      setUpdateError('Please provide at least one field to update.');
      return;
    }

    setLoading(true);
    setUpdateMessage('');
    setUpdateError('');

    try {
      const res = await axios.put(
        'http://localhost:3001/users/me',
        updateForm,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUpdateMessage('Profile updated successfully.');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setUpdateError(err.response.data.message || 'An error occurred while updating.');
      } else {
        setUpdateError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [field]: value || prevForm[field], // Retain current value if input is empty
    }));
  };


  const searchByName = async () => {
    if (!searchTerm) {
      setSearchError('Please enter a name to search.');
      return;
    }
  
    setLoading(true);
    setSearchError(''); // Clear previous search errors
    setSearchResult(null);
  
    try {
      const res = await axios.get(
        `http://localhost:3001/users/Studentfetch/${searchTerm}`,
        { withCredentials: true }
      );
      if (res.status !== 200) {
        throw new Error(`Failed to fetch user: ${res.status}`);
      }
  
      const userData = res.data;
      if (!userData || (Array.isArray(userData) && userData.length === 0)) {
        throw new Error('No user found with the given name.');
      }
  
      setSearchResult(userData);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setSearchError(err.response.data.message || 'An error occurred while searching.');
      } else {
        setSearchError(err.message || 'An error occurred while searching.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  const scrollToCourses = () => {
    document.getElementById('my-courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (error && !isInstructor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-bold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Add Navbar above Sidebar */}
      <Navbar userId={userId} />

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <InstructorSidebar />
        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Instructor</h1>
            <p className="text-gray-600">
              Manage your courses, students, and more using the dashboard below.
            </p>
          </header>

          {/* Dashboard Sections */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Link
              href="http://localhost:3000/courses"
              className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition transform hover:scale-105 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Management</h2>
              <p className="text-gray-600">Organize and manage your courses effectively.</p>
            </Link>
            <Link
              href="/progress/instructor-analytics"
              className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition transform hover:scale-105 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Tracking</h2>
              <p className="text-gray-600">Monitor student progress and scores.</p>
            </Link>
          </section>

          {/* Search Section */}
          <section className="mb-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search for a Student</h2>
  <div className="flex space-x-4">
    <input
      type="text"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-300"
      placeholder="Enter student name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button
      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
      onClick={searchByName}
      disabled={loading}
    >
      {loading ? 'Searching...' : 'Search by Name'}
    </button>
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      onClick={searchByEmail}
      disabled={loading}
    >
      {loading ? 'Searching...' : 'Search by Email'}
    </button>
  </div>
  {searchError && <p className="text-red-500 mt-4">{searchError}</p>}
  {searchResult && Array.isArray(searchResult) ? (
    <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">Search Results:</h3>
      {searchResult.map((user, index) => (
        <div key={index}>
          <p className="text-gray-700">Name: {user.name}</p>
          <p className="text-gray-700">Email: {user.email}</p>
        </div>
      ))}
    </div>
  ) : searchResult ? (
    <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">Search Result:</h3>
      <p className="text-gray-700">Name: {searchResult.name}</p>
      <p className="text-gray-700">Email: {searchResult.email}</p>
    </div>
  ) : null}
</section>


           {/* Update Section */}
           <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Personal Information</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-300"
                placeholder="Enter new name"
                value={updateForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              <input
                type="email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-300"
                placeholder="Enter new email"
                value={updateForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleUpdateSubmit}
              >
                {loading ? 'Updating...' : 'Update Information'}
              </button>
            </div>
            {updateError && <p className="text-red-500 mt-4">{updateError}</p>}
            {updateMessage && <p className="text-green-600 mt-4">{updateMessage}</p>}
          </section>
        </main>
      </div>
    </>
  );
}
