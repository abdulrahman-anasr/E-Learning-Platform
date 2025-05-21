"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function QuestionBankPage() {
   const path = usePathname().split('/');
          
            const getInstructorData = async () => {
              const instructorId = path[path.length - 1];
              const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
              return res.json();
            };
  const [showFindById, setShowFindById] = useState(false);
  const [id, setId] = useState<string>(""); // Input ID
  const [questionBank, setQuestionBank] = useState<any>(null); // Fetched question bank
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Function to fetch question bank by ID
  const fetchQuestionBankById = async () => {
    if (!id) {
      setError("Please enter a valid ID.");
      return;
    }
    setLoading(true);
    setError("");
    setQuestionBank(null);

    try {
      const response = await axios.get(
        `http://localhost:3001/questionbank/questionbank?id=${id}`,{withCredentials:true}
      );
      setQuestionBank(response.data);
    } catch (err) {
      console.error("Error fetching Question Bank by ID:", err);
      setError("No Question Bank found for the provided ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
      <main className="text-center">
        <h1 className="text-5xl font-bold mb-6">Manage Question Bank</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <a
            className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/questionbank/create"
          >
            Create a Question
          </a>
          <a
            className="rounded-lg bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/questionbank/findall"
          >
            Find All Questions
          </a>
          <a
            className="rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/questionbank/update"
          >
            Update a Question
          </a>
          <a
            className="rounded-lg bg-gradient-to-r from-red-600 to-red-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/questionbank/delete"
          >
            Delete a Question
          </a>
          <button
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            onClick={() => setShowFindById(!showFindById)}
          >
            Find by ID
          </button>
        </div>

        {/* Find by ID Section */}
        {showFindById && (
          <div className="mt-10 max-w-md mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Find by ID</h2>
            <div className="flex flex-col items-center gap-4">
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Question Bank ID"
                className="w-full border-2 border-gray-700 rounded-md p-3 text-black"
              />
              <button
                onClick={fetchQuestionBankById}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Search
              </button>
            </div>

            {/* Loading */}
            {loading && <p className="text-gray-400 mt-4">Loading...</p>}

            {/* Error */}
            {error && <p className="text-red-400 mt-4">{error}</p>}

            {/* Display Question Bank */}
            {questionBank && (
              <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">Question Bank Details</h3>
                <p>
                  <strong>ID:</strong> {questionBank._id}
                </p>
                <p>
                  <strong>Question:</strong> {questionBank.question}
                </p>
                <p>
                  <strong>Difficulty:</strong> {questionBank.difficulty_level}
                </p>
                <p>
                  <strong>Type:</strong> {questionBank.question_type}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
