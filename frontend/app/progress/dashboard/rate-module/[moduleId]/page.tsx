'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { get } from 'http';
import { getCookie } from 'cookies-next';


export default function RateModulePage() {
  const router = useRouter();
  const [moduleId, setModuleId] = useState<string>(''); // Store the module ID
  const [rating, setRating] = useState<number>(0); // Store rating value
  const [error, setError] = useState<string | null>(null); // Store error message
  const [ratedEntity] = useState<'Module'>('Module'); // Rated entity is always "Module"
const userId= getCookie("userId");
  // Handle module ID input change
  const handleModuleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModuleId(e.target.value);
  };

  // Handle form submission for rating
  const handleRateModule = async () => {
    if (!moduleId) {
      setError('Please enter a valid module ID.');
      return;
    }

    try {
 
      const response = await axios.post('http://localhost:3001/ratings', {
        ratedEntity, // "Module" is the only entity being rated
        ratedEntityId: moduleId, // The Module ID is directly used here
        user_id: userId,  // User ID of the person submitting the rating
        rating,
      });
      console.log('Rating submitted:', response.data);
      router.push(`/progress/dashboard/${userId}`); // Redirect to the dashboard after successful rating
    } catch (err) {
      setError('Failed to submit the rating.');
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Rate Module</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="text-lg">Enter Module ID:</label>
        <input
          type="text"
          value={moduleId}
          onChange={handleModuleIdChange}
          placeholder="Enter module ID"
          className="w-72 p-2 bg-gray-800 text-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="text-lg">Rate this Module (1-5):</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
          className="w-72 p-2 bg-gray-800 text-white rounded"
        />
      </div>

      <button
        onClick={handleRateModule}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Rate Module
      </button>
    </div>
  );
}
