'use client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default function RateModulePage() {
  const { moduleId } = useParams();
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
const path = usePathname().split('/');
  
    const getStudentData = async () => {
      const student = path[path.length - 1];
      const res = await fetch('http://localhost:3001/users/fetch/' + student, { credentials: 'include' });
      return res.json();
    };
    const role = getCookie("role");
    console.log("Role fetched: " + role);
  
    const userId = getCookie("userId"); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/ratings', {
        ratedEntityType: 'Module',
        ratedEntityId: moduleId,
        rating,
        userId,
      },{withCredentials: true});
      
      console.log('Rating submitted:', response.data);
      router.push(`/dashboard/${userId}`); // Redirect to the dashboard after successful rating
    } catch (err) {
      setError('Failed to submit the rating.');
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Rate Module</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-lg">Rating (1-5):</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Submit Rating
        </button>
      </form>
    </div>
  );
}

