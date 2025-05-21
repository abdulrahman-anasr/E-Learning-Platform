'use client';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'http';
import { getCookie } from 'cookies-next';

interface Module {
  _id: string;
  course_id: string;
  title: string;
  content: string;
  resources?: string[];
  created_at: string;
}

export default function RateModulePage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isStudent, setIsStudent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId=getCookie("userId");
  const path = usePathname().split('/');
  
    const getStudentData = async () => {
      const student = path[path.length - 1];
      const res = await fetch('http://localhost:3001/users/fetch/' + student, { credentials: 'include' });
      return res.json();
    };
  useEffect(() => {
    const role = getCookie('role');
    console.log("Role: ", role);
    if (role === 'student') {
      setIsStudent(true);
    } else {
      setError('You are not authorized to view this page.');
    }
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/modules/by-course/${userId}`,{withCredentials: true});
        setModules(response.data);
      } catch (err) {
        console.error('Error fetching modules:', (err as Error).message);
      }
    };

    fetchModules();
  }, [userId]);

  const handleSubmit = async () => {
    if (!selectedModule || rating < 1 || rating > 5) {
      setFeedback('Please select a module and provide a rating between 1 and 5.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/ratings', {
        ratedEntity: 'Module',
        ratedEntityId: selectedModule,
        rating,
        user_id: userId,
      },{withCredentials: true});
      setFeedback('Thank you for rating the module!');
    } catch (err) {
      console.error('Error rating module:', (err as Error).message);
      setFeedback('Failed to submit rating. Please try again.');
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Rate a Module</h1>
      <select
        className="bg-gray-800 p-3 rounded-lg text-white w-64 mb-4"
        value={selectedModule}
        onChange={(e) => setSelectedModule(e.target.value)}
      >
        <option value="">Select a Module</option>
        {modules.map((module) => (
          <option key={module._id} value={module._id}>
            {module.title}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        max="5"
        className="bg-gray-800 p-3 rounded-lg text-white w-64 mb-4"
        placeholder="Enter rating (1-5)"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />
      <button className="bg-green-500 p-3 rounded-lg text-white" onClick={handleSubmit}>
        Submit Rating
      </button>
      {feedback && <p className="mt-4">{feedback}</p>}
    </div>
  );
}
