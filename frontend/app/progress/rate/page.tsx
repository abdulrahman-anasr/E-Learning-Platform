'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';

// Define the interface for ratings data
interface Rating {
  _id: string;
  rating: number;
  ratedEntity: string; // 'Module', 'Instructor', etc.
  ratedEntityId: string;
  user_id: string;
  name?: string; // Name of the rated entity
}

const AllRatings = () => {
  const [moduleRatings, setModuleRatings] = useState<Rating[]>([]);
  const [instructorRatings, setInstructorRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const role = getCookie("role");

  useEffect(() => {
    if (role === 'admin') {
      setIsAdmin(true);

      const fetchRatings = async () => {
        try {
          // Fetch all ratings
          const response = await axios.get('http://localhost:3001/ratings', { withCredentials: true });
          const allRatings: Rating[] = response.data;

          // Separate ratings by `ratedEntity`
          const modules = allRatings.filter((rating) => rating.ratedEntity === 'Module');
          const instructors = allRatings.filter((rating) => rating.ratedEntity === 'Instructor');

          // Fetch module names
          const moduleNames = await Promise.all(
            modules.map(async (module) => {
              try {
                const res = await axios.get(`http://localhost:3001/modules/get/${module.ratedEntityId}`, { withCredentials: true });
                console.log(res.data.title);
                return { ...module, name: res.data.title };
              } catch (error) {
                console.error(`Error fetching module name for ID ${module.ratedEntityId}:`, error);
                return { ...module, name: 'Unknown Module' };
              }
            })
          );

          // Fetch instructor names
          const instructorNames = await Promise.all(
            instructors.map(async (instructor) => {
              try {
                const res = await axios.get(`http://localhost:3001/users/fetch/${instructor.ratedEntityId}`, { withCredentials: true });
                console.log('Instructor data:', res.data);
                return { ...instructor, name: res.data.email };
              } catch (error) {
                console.error(`Error fetching instructor name for ID ${instructor.ratedEntityId}:`, error);
                return { ...instructor, name: 'Unknown Instructor' };
              }
            })
          );

          setModuleRatings(moduleNames);
          setInstructorRatings(instructorNames);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching ratings:', err);
          setError('Failed to fetch ratings');
          setLoading(false);
        }
      };

      fetchRatings();
    } else {
      setError('You are not authorized to view this page.');
    }
  }, [role]);

  if (loading) {
    return <div>Loading ratings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-6">All Feedback Submitted By Students</h1>

      {/* Module Ratings */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Module Ratings</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="px-4 py-2 text-left">Module Name</th>
              <th className="px-4 py-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {moduleRatings.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-400">No module ratings available</td>
              </tr>
            ) : (
              moduleRatings.map((rating) => (
                <tr key={rating._id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{rating.name}</td>
                  <td className="px-4 py-2">{rating.rating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Instructor Ratings */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Instructor Ratings</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="px-4 py-2 text-left">Instructor Name</th>
              <th className="px-4 py-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {instructorRatings.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-400">No instructor ratings available</td>
              </tr>
            ) : (
              instructorRatings.map((rating) => (
                <tr key={rating._id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{rating.name}</td>
                  <td className="px-4 py-2">{rating.rating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRatings;