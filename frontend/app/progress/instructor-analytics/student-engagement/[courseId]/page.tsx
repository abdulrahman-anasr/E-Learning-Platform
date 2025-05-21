'use client';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { getCookie } from 'cookies-next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StudentEngagement {
  enrolledStudentsCount: number;
  completedStudentsCount: number;
  performanceMetrics: {
    belowAverage: number;
    average: number;
    aboveAverage: number;
    excellent: number;
  };
}

export default function StudentEngagementPage() {
  const path = usePathname().split('/');
  
    const getInstructorData = async () => {
      const instructor = path[path.length - 1];
      const res = await fetch('http://localhost:3001/users/fetch/' + instructor, { credentials: 'include' });
      return res.json();
    };
  const { courseId } = useParams(); // Get courseId from the URL
  const [studentEngagementData, setStudentEngagementData] = useState<StudentEngagement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);
  const userId = getCookie('userId');
  const role = getCookie("role");
  console.log("Role fetched: " + role);
  useEffect(() => {
    const role = getCookie('role');
    console.log("Role: ", role);
    if (role === 'instructor') {
      setIsInstructor(true);
    } else {
      setError('You are not authorized to view this page.');
    }
    const fetchStudentEngagement = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/progress/student-engagement/${courseId}`,{withCredentials: true});  
        setStudentEngagementData(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to fetch student engagement data.');
        setLoading(false);
        console.error(err.message);
      }
    };

    if (courseId) fetchStudentEngagement();
  }, [courseId]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
  };

  if (loading) {
    return <p className="text-gray-400 text-center">Loading student engagement data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!studentEngagementData) {
    return <p className="text-red-500 text-center">No data available for student engagement.</p>;
  }

 
  const performanceData = {
    labels: ['Below Average', 'Average', 'Above Average', 'Excellent'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          studentEngagementData.performanceMetrics.belowAverage,
          studentEngagementData.performanceMetrics.average,
          studentEngagementData.performanceMetrics.aboveAverage,
          studentEngagementData.performanceMetrics.excellent,
        ],
        backgroundColor: '#4BC0C0', 
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

 
  const handleExportPDF = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/progress/export-student-engagement/pdf/${courseId}`, {
        responseType: 'blob', 
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'student_engagement_report.pdf'; 
      link.click();
    } catch (err) {
      console.error('Error exporting student engagement PDF:', err);
      setError('Failed to export the PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Student Engagement</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 text-center">
        <h2 className="text-lg font-semibold">Course Engagement</h2>
        <p className="text-white">Enrolled Students: {studentEngagementData.enrolledStudentsCount}</p>
        <p className="text-white">Completed Students: {studentEngagementData.completedStudentsCount}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 text-center">
        <h2 className="text-lg font-semibold">Performance Metricss</h2>
        <div className="w-full h-[300px] mx-auto">
          <Bar data={performanceData} options={chartOptions} />
        </div>
      </div>

      <button
        onClick={handleExportPDF}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? 'Exporting...' : 'Export Student Engagement Report (PDF)'}
      </button>
    </div>
  );
}
