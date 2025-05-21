"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";

export default function UpdateQuestion() {
   const path = usePathname().split('/');
        
          const getInstructorData = async () => {
            const instructorId = path[path.length - 1];
            const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
            return res.json();
          };
  const [id, setId] = useState<string>(""); // Input ID
  const [questionData, setQuestionData] = useState<any>(null); // Fetched question data
  const [formData, setFormData] = useState<any>({}); // Editable form data
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const token = getCookie('token'); 
  
  // Fetch Question by ID
  const fetchQuestionById = async () => {
    if (!id) {
      setError("Please enter a valid Question ID.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.get(
        `http://localhost:3001/questionbank/questionbank?id=${id}`,{withCredentials:true}
      );
      setQuestionData(response.data);
      setFormData(response.data);
    } catch {
      setError("Failed to retrieve the question. Check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Update Question
  const updateQuestion = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.put(
        `http://localhost:3001/questionbank/updatequestionbank?id=${id}`,
        formData,
        {withCredentials:true}
      );
      setSuccess("Question updated successfully!");
    } catch {
      setError("Failed to update the question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-black">
      <h1 className="text-3xl font-bold mb-6 text-white">Update Question</h1>

      {/* Input for Question ID */}
      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Question ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded text-black w-full"
        />
        <button
          onClick={fetchQuestionById}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch
        </button>
      </div>

      {/* Error/Loading/Success */}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Update Form */}
      {questionData && (
        <form className="flex flex-col gap-4 w-full max-w-md">
          <label className="text-white">
            Question:
            <input
              type="text"
              name="question"
              value={formData.question || ""}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            />
          </label>

          <label className="text-white">
            Options (Comma-separated):
            <input
              type="text"
              name="options"
              value={formData.options?.join(", ") || ""}
              onChange={(e) =>
                handleChange({
                  target: { name: "options", value: e.target.value.split(",") },
                } as any)
              }
              className="border p-2 rounded text-black w-full"
            />
          </label>

          <label className="text-white">
            Correct Answer:
            <input
              type="text"
              name="correct_answer"
              value={formData.correct_answer || ""}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            />
          </label>

          <label className="text-white">
            Explanation:
            <input
              type="text"
              name="explanation"
              value={formData.explanation || ""}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            />
          </label>

          <label className="text-white">
            Difficulty Level:
            <select
              name="difficulty_level"
              value={formData.difficulty_level || ""}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <label className="text-white">
            Question Type:
            <select
              name="question_type"
              value={formData.question_type || ""}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Select Question Type</option>
              <option value="MCQ">MCQ</option>
              <option value="TrueFalse">True/False</option>
              <option value="Both">Both</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="button"
            onClick={updateQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {loading ? "Updating..." : "Update Question"}
          </button>
        </form>
      )}
    </div>
  );
}
