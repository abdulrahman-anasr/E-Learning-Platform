"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function DeleteQuestion() {
  const path = usePathname().split('/');
          
            const getInstructorData = async () => {
              const instructorId = path[path.length - 1];
              const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
              return res.json();
            };
  const [id, setId] = useState<string>(""); // Input ID
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [success, setSuccess] = useState<string>(""); // Success message
  const [error, setError] = useState<string>(""); // Error message

  // Function to delete a question by ID
  const deleteQuestionById = async () => {
    if (!id) {
      setError("Please enter a valid Question ID.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.delete(`http://localhost:3001/questionbank/deletequestionbank?id=${id}`,{withCredentials:true});
      setSuccess("Question deleted successfully!");
      setId(""); // Clear the input
    } catch (err) {
      console.error("Error deleting Question:", err);
      setError("Failed to delete the question. Please check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-extrabold mb-6">Delete a Question</h1>

      {/* Input Field for Question ID */}
      <div className="w-full max-w-md flex items-center gap-2 mb-6">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Question ID"
          className="border p-3 w-full rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={deleteQuestionById}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-300"
        >
          Delete
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500 text-lg">Processing...</p>}

      {/* Error State */}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-500 text-lg">{success}</p>}
    </div>
  );
}
