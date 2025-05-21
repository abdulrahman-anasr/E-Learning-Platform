'use client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCookie } from 'cookies-next';
import { getCookies } from 'cookies-next/client';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

interface Dashboard {
  averageScore: number;
  classification: string;
  completedCourses: { courseId: string }[];
  courseCompletionRates: { courseId: string; completionRate: number }[];
  engagementTrends: { courseId: string; attendanceRate: number }[];
  courseScores: { courseId: string; averageScore: number }[];
}

export default function DashboardPage() {
const path = usePathname().split('/');

  const getStudentData = async () => {
    const student = path[path.length - 1];
    const res = await fetch('http://localhost:3001/users/fetch/' + student, { credentials: 'include' });
    return res.json();
  };
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStudent, setIsStudent] = useState(false);
  const userId = getCookie('userId');
  const role = getCookie("role");
  console.log("Role fetched: " + role);

  useEffect(() => {
    console.log('All cookies are ' + JSON.stringify(getCookies()));
    const role = getCookie('role');
    console.log("Role: ", role);
    if (role === 'student') {
      setIsStudent(true);
    } else {
      setError('You are not authorized to view this page.');
    }
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/progress/dashboard/${userId}`,{withCredentials: true});
        setDashboardData(response.data);
      } catch (err: any) {
        setError('Failed to fetch dashboard data.');
        console.error(err.message);
      }
    };

    if (userId) fetchDashboard();
  }, [userId]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  const handleRateInstructor = () => {
    router.push(`/progress/dashboard/rate-instructor/${userId}`);
  };

  
  const handleRateModule = () => {
    router.push(`/progress/dashboard/rate-module/${userId}`);
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      {dashboardData ? (
        <div className="space-y-6 w-full max-w-5xl">
          {/* Overall Performance */}
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Overall Performance</h2>
            <p className="text-base">Average Score: {dashboardData.averageScore}%</p>
            <p className="text-base">Classification: {dashboardData.classification}</p>
          </div>

          {/* Buttons to Rate */}
          <div className="flex justify-center gap-4 my-4">
            <button
              onClick={handleRateInstructor}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
            >
              Rate an Instructor
            </button>
            <button
              onClick={handleRateModule}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
            >
              Rate a Module
            </button>
          </div>

          {/* Average Scores for Each Course */}
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Your Average Scores for Each Course</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {dashboardData.courseScores.map((course, index) => {
                const data = {
                  labels: ['Average', 'Remaining'],
                  datasets: [
                    {
                      data: [course.averageScore, 100 - course.averageScore],
                      backgroundColor: ['#36A2EB', '#CFCFCF'],
                    },
                  ],
                };
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-[100px] h-[100px]">
                      <Doughnut data={data} options={chartOptions} />
                    </div>
                    <p className="text-sm mt-2">Course {index + 1}: {course.averageScore}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Completion Rates */}
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Your Course Completion Rates</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {dashboardData.courseCompletionRates.map((rate, index) => {
                const data = {
                  labels: ['Completed', 'Remaining'],
                  datasets: [
                    {
                      data: [rate.completionRate, 100 - rate.completionRate],
                      backgroundColor: ['#FF6384', '#CFCFCF'],
                    },
                  ],
                };
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-[100px] h-[100px]">
                      <Doughnut data={data} options={chartOptions} />
                    </div>
                    <p className="text-sm mt-2">Course {index + 1}: {rate.completionRate}% Completed</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engagement Trends */}
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Your Engagement Trends</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {dashboardData.engagementTrends.map((trend, index) => {
                const data = {
                  labels: ['Attendance', 'Remaining'],
                  datasets: [
                    {
                      data: [trend.attendanceRate, 100 - trend.attendanceRate],
                      backgroundColor: ['#FF9F40', '#CFCFCF'],
                    },
                  ],
                };
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-[100px] h-[100px]">
                      <Doughnut data={data} options={chartOptions} />
                    </div>
                    <p className="text-sm mt-2">
                      Course {index + 1}: {trend.attendanceRate.toFixed(2)}% Attendance
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completed Courses */}
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Courses You Have Completed</h2>
            {dashboardData.completedCourses.length > 0 ? (
              <ul className="list-disc list-inside text-center">
                {dashboardData.completedCourses.map((course, index) => (
                  <li key={index} className="text-sm text-green-400">
                    Course {index + 1}: {course.courseId}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No completed courses yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center">Loading dashboard data...</p>
      )}
    </div>
  );
}
