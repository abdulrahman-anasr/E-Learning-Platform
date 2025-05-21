'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { getCookies, getCookie } from 'cookies-next';

export default function RateInstructorPage() {
  const [courseId, setCourseId] = useState<string>(''); // Store course ID
  const [instructor, setInstructor] = useState<any | null>(null); // Store fetched instructor
  const [rating, setRating] = useState<number>(0); // Store rating
  const [error, setError] = useState<string | null>(null); // Store any errors
  const [isStudent, setIsStudent] = useState(false);
  const router = useRouter();
  const path = usePathname().split('/');
  
    const getStudentData = async () => {
      const student = path[path.length - 1];
      const res = await fetch('http://localhost:3001/users/fetch/' + student, { credentials: 'include' });
      return res.json();
    };
    const userId = getCookie("userId"); 
    useEffect(() => {
      console.log('All cookies are ' + JSON.stringify(getCookies()));
      const role = getCookie('role');

      console.log("Role: ", role);
      if (role === 'student') {
        setIsStudent(true);
      } else {
        setError('You are not authorized to view this page.');
      }
    }, []);
  // Handle course ID input change
  const handleCourseIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(e.target.value);
  };

  // Fetch instructor based on course ID
  const fetchInstructor = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/progress/instructor/${courseId}`,{withCredentials: true});
      setInstructor(response.data); // Store the fetched instructor
    } catch (err) {
      setError('Failed to fetch instructor. Please check the course ID.');
      console.error(err);
    }
  };

  // Submit rating for the instructor
  const handleRateInstructor = async () => {
    try { // Replace with actual user ID
      await axios.post('http://localhost:3001/ratings', {
        ratedEntityType: 'Instructor',
        ratedEntityId: instructor._id, // Instructor's ID
        rating,
        userId,
      },{withCredentials: true});
      alert('Rating submitted successfully!');
      router.push(`/dashboard/${userId}`); // Redirect to dashboard after submitting
    } catch (err) {
      setError('Failed to submit the rating.');
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4 flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Rate Instructor</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={(e) => { e.preventDefault(); fetchInstructor(); }} className="space-y-4">
        <label className="block text-lg">Enter Course ID:</label>
        <input
          type="text"
          value={courseId}
          onChange={handleCourseIdChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Retrieve Instructor
        </button>
      </form>

      {instructor && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Instructor for this Course</h2>
          <p>{instructor.name}</p>
          <div className="mt-2">
            <label className="text-sm">Rate this Instructor (1-5):</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
              className="w-20 p-2 bg-gray-800 text-white rounded"
            />
          </div>
          <button
            onClick={handleRateInstructor}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Rate {instructor.name}
          </button>
        </div>
      )}
    </div>
  );
}
