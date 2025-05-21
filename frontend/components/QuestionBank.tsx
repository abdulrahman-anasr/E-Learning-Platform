"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

const CreateQuestion = () => {
  const path = usePathname().split('/');
    
      const getInstructorData = async () => {
        const instructorId = path[path.length - 1];
        const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
        return res.json();
      };
  const [formData, setFormData] = useState({
    question: "",
    options: "",
    correct_answer: "",
    explanation: "",
    difficulty_level: "",
    module_id: "",
    question_type: "",
  });

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async () => {
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/questionbank/createquestion",
        {
          ...formData,
          options: formData.options.split(",").map((opt) => opt.trim()), // Convert options to an array
        },
        {withCredentials:true}
      );
      setSuccess("Question created successfully!");
      setFormData({
        question: "",
        options: "",
        correct_answer: "",
        explanation: "",
        difficulty_level: "",
        module_id: "",
        question_type: "",
      });
    } catch (err) {
      console.error("Error creating question:", err);
      setError("Failed to create the question. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-white">Create a New Question</h1>

      <div className="w-full max-w-md bg-gray-100 text-black p-6 rounded-lg shadow-lg">
        {/* Question */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Question:</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">
            Options (Comma-separated):
          </label>
          <input
            type="text"
            name="options"
            value={formData.options}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Correct Answer */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Correct Answer:</label>
          <input
            type="text"
            name="correct_answer"
            value={formData.correct_answer}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Explanation:</label>
          <input
            type="text"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Difficulty Level */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Difficulty Level:</label>
          <select
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Module ID */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Module ID:</label>
          <input
            type="text"
            name="module_id"
            value={formData.module_id}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Question Type */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Question Type:</label>
          <select
            name="question_type"
            value={formData.question_type}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Type</option>
            <option value="MCQ">MCQ</option>
            <option value="True/False">True/False</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          Create Question
        </button>

        {/* Success and Error Messages */}
        {success && <p className="mt-4 text-green-600">{success}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default CreateQuestion;
