'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';
import CourseNotes from 'components/CourseNotes';
import Link from 'next/link';
import Navbar from 'components/Navbar'; // Import the Navbar component
import StudentSidebar from 'components/StudentSidebar';

type Course = {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  progress: number;
  attendanceRate?: number;
  completionRate?: number;
};

export default function StudentDashboard() {
  const path = usePathname().split('/');
  const student = path[path.length - 1]; // Extract the student ID from the URL

  const [courses, setCourses] = useState<Course[]>([]);
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [notesRefresh , setNotesRefresh] = useState(true);
  const [fetchedUserCourses, setFetchedUserCourses] = useState(false);
  const [fetchedCompletionRates, setFetchedCompletionRates] = useState(false);
  const [notes , setNotes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState({ name: '', email: '' });
  const [updateError, setUpdateError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [completionRates, setCompletionRates] = useState<any[]>([]);
  const role = getCookie('role');
  const userId = getCookie('userId') || '';

  const fetchStudentData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/users/fetch/${userId}`, { withCredentials: true });
      const data = res.data;

      if (data) {
        setStudentName(data.name);
        setUpdateForm((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
        }));
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  const fetchCompletionRates = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/fetchcompletionrates`, {
        withCredentials: true,
      });
      setCompletionRates(response.data);
      console.log("Data returned from fetch ratees is: " + JSON.stringify(response.data));
      courses.forEach((course) => {
        console.log("Course completion rate is: " + course.completionRate);
        console.log("Inside a course whose id is: " + course._id);
        const miniCourse = response.data.find((rate : any) => rate.courseId === course._id);
        console.log("Mini course is: " + JSON.stringify(miniCourse));
        const completionRate = miniCourse?.courseCompletionRate;
        courses.forEach((c) => {
          if (c._id === course._id) {
            c.completionRate = completionRate;
          }
        });
        setCourses(courses);
        console.log("Now Course completion rate is: " + course.completionRate);
      });
      setFetchedCompletionRates(true);
    } catch (error) {
      console.error('Error fetching course completion rates:', error);
    }
  };

  const fetchUserSpecificCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/fetch/${userId}`);
      const user = response.data;
      const enrolledCourseIds = user.courses;
  
      if (!enrolledCourseIds || enrolledCourseIds.length === 0) {
        console.log('No courses found for this user');
        return;
      }
  
      const courseResponses = await Promise.all(
        enrolledCourseIds.map((courseId: any) =>
          axios.get(`http://localhost:3001/courses/${courseId}`)
        )
      );

      const removeDups = (arr: Course[]) : any[] => {
        let uniqueIds: string[] = [];
        let unique: Course[] = [];
        arr.forEach(element => {
            if (!uniqueIds.includes(element._id)) {
                uniqueIds.push(element._id);
                unique.push(element);
            }
        });
        return unique;
    }
      
  
      const courses = removeDups(courseResponses.map((response) => response.data));

      setCourses(
        courses.map((course) => {
          const completionRate = completionRates.find((rate) => rate.courseId === course._id)?.courseCompletionRate;
          return { ...course, completionRate: completionRate || 0 };
        })
      );

      setFetchedUserCourses(true);
    } catch (error) {
      console.error('Error fetching user-specific courses:', error);
    }
  };
  

  const handleUpdateSubmit = async () => {
    if (!updateForm.name && !updateForm.email) {
      setUpdateError('Please provide at least one field to update.');
      return;
    }

    setLoading(true);
    setUpdateMessage('');
    setUpdateError(''); // Clear previous update errors

    try {
      const res = await axios.put(
        'http://localhost:3001/users/me',
        updateForm,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUpdateMessage('Profile updated successfully.');
        setUpdateForm({ name: '', email: '' });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        // Display the custom error message from the backend
        setUpdateError(err.response.data.message || 'An error occurred while updating.');
      } else {
        setUpdateError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role !== 'student') {
      setError('You are not authorized to view this page.');
      return;
    }

    fetchStudentData();
    fetchUserSpecificCourses();

    if(fetchedUserCourses) {
      fetchCompletionRates();
    }
    
    

    if(notesRefresh) {
      async function getNotes() {
        try {
          const response = await fetch('http://localhost:3001/notes/getAll' , {credentials : 'include'});
          const dataJson = await response.json();
          setNotes(dataJson);
        } catch (error) {
          console.log(error);
        }
      }

      getNotes();
      setNotesRefresh(false);
    }
  }, [notesRefresh , fetchedUserCourses , fetchedCompletionRates]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-bold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar userId={userId} />

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <StudentSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {studentName || 'Student'}</h1>
            <p className="text-gray-600">Track your progress and manage your account.</p>
          </header>

          {/* Redirection Box */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Link
              href="http://localhost:3000/courses"
              className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition transform hover:scale-105 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Management</h2>
              <p className="text-gray-600">Organize and manage your courses effectively.</p>
            </Link>
            <Link
              href={`/progress/dashboard/${userId}`}
              className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition transform hover:scale-105 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Tracking</h2>
              <p className="text-gray-600">Monitor student progress and scores.</p>
            </Link>
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
                onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
              />
              <input
                type="email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-300"
                placeholder="Enter new email"
                value={updateForm.email}
                onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
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
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  {courses.map((course) => (
    <div
      key={course._id}
      className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition transform hover:scale-105"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{course.title}</h2>
      <p className="text-gray-600 mb-2">Category: {course.category}</p>
      <p className="text-gray-600 mb-2">Difficulty: {course.difficulty_level}</p>
      <p className="text-gray-600 mb-2">
        Completion Rate: {course.completionRate + '%'}
      </p>
    </div>
  ))}
</section>



          {/* Notes Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Notes</h2>
            <CourseNotes data={notes} userId={userId} courseId={null} setRefresh={setNotesRefresh} />
          </section>
        </main>
      </div>
    </>
  );
}