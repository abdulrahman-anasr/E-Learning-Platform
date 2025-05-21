'use client';

import { getCookie } from 'cookies-next';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnalyticsPage() {
  const path = usePathname().split('/');
  const [isInstructor, setIsInstructor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);  // To store courses for selection
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);  // To store the selected course ID
  const [loadingCourses, setLoadingCourses] = useState(true);
  
  const role = getCookie("role");
  const userId = getCookie("userId");
  const router = useRouter();

  useEffect(() => {
    // Check role and authorize access
    if (role === 'instructor') {
      setIsInstructor(true);
      
      // Fetch the courses created by the instructor
      const fetchInstructorCourses = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/courses/getAll`, { withCredentials: true });
          const instructorCourses = response.data.filter((course: any) => course.created_by === userId);
          setCourses(instructorCourses);
        } catch (err) {
          setError('Failed to fetch courses.');
        } finally {
          setLoadingCourses(false);
        }
      };
      
      fetchInstructorCourses();
    } else {
      setError('You are not authorized to view this page.');
    }
  }, [role, userId]);

  // Handle course selection and navigate to the selected course's analytics
  const handleCourseSelection = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleNavigate = (route: string) => {
    if (selectedCourseId) {
      router.push(route.replace('[courseId]', selectedCourseId));  // Dynamically replace courseId in the route
    } else {
      setError('Please select a course first.');
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Instructor Analytics</h1>
      
      {/* Display error if there's any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Course Selection Dropdown */}
      {isInstructor && !loadingCourses && (
        <div>
          <label htmlFor="courseSelect" className="text-lg font-semibold">Select Course:</label>
          <select
            id="courseSelect"
            className="bg-gray-800 text-white p-2 rounded mt-2"
            onChange={(e) => handleCourseSelection(e.target.value)}
            value={selectedCourseId || ''}
          >
            <option value="" disabled>Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Loading state */}
      {loadingCourses && <p className="text-gray-400">Loading courses...</p>}

      {/* Navigation Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => handleNavigate(`/progress/instructor-analytics/content-effectiveness/[courseId]/instructor/${userId}`)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Content Effectiveness
        </button>

        <button
          onClick={() => handleNavigate(`/progress/instructor-analytics/student-engagement/[courseId]`)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Student Engagement
        </button>

        <button
          onClick={() => handleNavigate(`/progress/instructor-analytics/assessment-results/[courseId]`)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Quiz Results
        </button>
      </div>
    </div>
  );
}
