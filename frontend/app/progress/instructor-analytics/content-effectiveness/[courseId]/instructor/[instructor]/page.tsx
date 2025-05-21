'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ModuleRating {
  moduleId: string;
  averageRating: number;
}

interface ContentEffectivenessData {
  courseId: string;
  courseRating: number;
  instructorRating: number;
  moduleRatings: ModuleRating[];
}

export default function ContentEffectivenessPage() {
  const { courseId } = useParams(); // Extract courseId from the URL
  const [contentEffectivenessData, setContentEffectivenessData] = useState<ContentEffectivenessData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = getCookie("userId");
  const role = getCookie("role");

  useEffect(() => {
    if (role !== 'instructor') {
      setError('You are not authorized to view this page.');
      setLoading(false);
      return;
    }

    const fetchContentEffectivenessData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/progress/content-effectiveness/${courseId}`,
          { withCredentials: true }
        );
        setContentEffectivenessData(response.data);
      } catch (err) {
        setError('Failed to fetch content effectiveness data.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && userId) fetchContentEffectivenessData();
  }, [courseId, userId, role]);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading content effectiveness data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!contentEffectivenessData) {
    return <p className="text-red-500 text-center">No content effectiveness data found.</p>;
  }

  const handleExportPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/progress/export-content-effectiveness/pdf/${courseId}`,
        { responseType: 'blob' }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'content_effectiveness_report.pdf';
      link.click();
    } catch (err) {
      console.error('Error exporting content effectiveness PDF:', err);
      setError('Failed to export the PDF. Please try again.');
    }
  };

  // Bar chart data for visualizing course and instructor ratings
  const ratingsData = {
    labels: ['Course Rating', 'Instructor Rating'],
    datasets: [
      {
        label: 'Average Rating',
        data: [contentEffectivenessData.courseRating, contentEffectivenessData.instructorRating],
        backgroundColor: ['#4BC0C0', '#FF6384'],
        borderColor: ['#36A2EB', '#FF5733'],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for visualizing module ratings
  const moduleRatingsData = {
    labels: contentEffectivenessData.moduleRatings.map((module) => `Module ${module.moduleId}`),
    datasets: [
      {
        label: 'Average Rating',
        data: contentEffectivenessData.moduleRatings.map((module) => module.averageRating),
        backgroundColor: '#FF6384',
        borderColor: '#FF5733',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Content Effectiveness</h1>

      {/* Course & Instructor Ratings */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Course & Instructor Ratings</h2>
        <Bar data={ratingsData} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>

      {/* Module Ratings */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Module Ratings</h2>
        {contentEffectivenessData.moduleRatings.length === 0 ? (
          <p className="text-gray-400">No module ratings available for this course.</p>
        ) : (
          <Bar data={moduleRatingsData} options={{ responsive: true, maintainAspectRatio: true }} />
        )}
      </div>

      {/* Export Button */}
      <button
        onClick={handleExportPDF}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Export Content Effectiveness (PDF)
      </button>
    </div>
  );
}