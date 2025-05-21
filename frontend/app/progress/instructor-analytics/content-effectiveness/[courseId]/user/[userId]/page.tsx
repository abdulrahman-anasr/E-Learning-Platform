'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { getCookie } from 'cookies-next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ContentEffectivenessPage() {
  const { courseId } = useParams(); 
  const [contentData, setContentData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStudent, setIsStudent] = useState(false);
  const path = usePathname().split('/');
  
    const getStudentData = async () => {
      const student = path[path.length - 1];
      const res = await fetch('http://localhost:3001/users/fetch/' + student, { credentials: 'include' });
      return res.json();
    };
    const role = getCookie("role");
    console.log("Role fetched: " + role);
  
    const userId = getCookie("userId");

  useEffect(() => {
    if (!courseId || !userId) {
      setError('Missing course or user ID.');
      return;
    }
    const role = getCookie('role');
      console.log("Role: ", role);
      if (role === 'student') {
        setIsStudent(true);
      } else {
        setError('You are not authorized to view this page.');
      }

    const fetchContentEffectiveness = async () => {
      try {
        const url = `http://localhost:3001/progress/content-effectiveness/${courseId}`;
        const response = await axios.get(url,{withCredentials: true});
        setContentData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load content effectiveness data.');
        setLoading(false);
      }
    };

    fetchContentEffectiveness();
  }, [courseId, userId]);

  if (loading) {
    return <p>Loading content effectiveness data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Bar chart data for visualizing course and instructor ratings
  const ratingsData = {
    labels: ['Course Rating', 'Instructor Rating'],
    datasets: [
      {
        label: 'Average Rating',
        data: [contentData?.courseRating, contentData?.instructorRating],
        backgroundColor: '#4BC0C0',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for visualizing module ratings
  const moduleRatingsData = {
    labels: contentData?.moduleRatings.map((module: any) => `Module ${module.moduleId}`),
    datasets: [
      {
        label: 'Average Rating',
        data: contentData?.moduleRatings.map((module: any) => module.averageRating),
        backgroundColor: '#FF6384',
        borderColor: '#FF5733',
        borderWidth: 1,
      },
    ],
  };

  const handleExportPDF = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/progress/export-content-effectivenes/pdf/${courseId}`, {
        responseType: 'blob', 
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'content_effectiveness_report.pdf'; // Filename for the downloaded PDF
      link.click();
    } catch (err) {
      console.error('Error exporting content effectiveness PDF:', err);
      setError('Failed to export the PDF. Please try again.');
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Content Effectiveness</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 text-center w-full max-w-md">
        <h2 className="text-lg font-semibold">Course & Instructor Rating</h2>
        <div className="w-full h-[300px] mx-auto">
          <Bar data={ratingsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 text-center w-full max-w-md">
        <h2 className="text-lg font-semibold">Module Ratings</h2>
        <div className="w-full h-[300px] mx-auto">
          <Bar data={moduleRatingsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <button
        onClick={handleExportPDF}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Export Content Effectiveness (PDF)
      </button>
    </div>
  );
}
