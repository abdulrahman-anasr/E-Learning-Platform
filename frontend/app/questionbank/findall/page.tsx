"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function FindAllQuestionBanks() {
  const path = usePathname().split('/');
      
        const getInstructorData = async () => {
          const instructorId = path[path.length - 1];
          const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
          return res.json();
        };
  const [questionBanks, setQuestionBanks] = useState<any[]>([]); // State to store all question banks
  const [error, setError] = useState<string>(""); // State to handle errors
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Function to fetch all question banks
  const fetchAllQuestionBanks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3001/questionbank/allquestionbanks",{withCredentials:true});
      setQuestionBanks(response.data);
    } catch (err) {
      console.error("Error fetching all Question Banks:", err);
      setError("Failed to fetch Question Banks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all question banks on component mount
  useEffect(() => {
    fetchAllQuestionBanks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">All Question Banks</h1>

      {/* Loading State */}
      {loading && <p className="text-gray-500 text-lg">Loading...</p>}

      {/* Error State */}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {/* Display Question Banks */}
      {!loading && !error && questionBanks.length > 0 && (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questionBanks.map((qb) => (
            <div
              key={qb._id}
              className="border rounded-lg shadow-md p-4 bg-gray-800 text-white"
            >
              <h2 className="text-xl font-semibold mb-2">Question Bank</h2>
              <p>
                <strong>ID:</strong> {qb._id}
              </p>
              <p>
                <strong>Question:</strong> {qb.question}
              </p>
              <p>
                <strong>Difficulty:</strong> {qb.difficulty_level}
              </p>
              <p>
                <strong>Type:</strong> {qb.question_type}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No Data State */}
      {!loading && !error && questionBanks.length === 0 && (
        <p className="text-gray-500 text-lg">No Question Banks found.</p>
      )}
    </div>
  );
}
