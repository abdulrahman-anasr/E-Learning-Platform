"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const CreateCourse = ({userId , setRefresh} : {userId : any , setRefresh : Dispatch<SetStateAction<boolean>>}) => {
  const path = usePathname().split('/');
    
      const getInstructorData = async () => {
        const instructorId = path[path.length - 1];
        const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
        return res.json();
      };
  const [formData, setFormData] = useState({
    title : "",
    description : "",
    difficulty_level : "",
    category : "",
    created_by : userId
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
        "http://localhost:3001/courses/create",
        {
          ...formData,
        },
        {withCredentials:true}
      );
      setSuccess("Course created successfully!");
      setFormData({
        title : "",
        description : "",
        difficulty_level : "",
        category : "",
        created_by: userId
      });
      setRefresh(true);
    } catch (err) {
      console.error("Error creating Course:", err);
      setError("Failed to create the Course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl font-bold mb-8 text-black">Create a New Course</h1>

      <div className="w-full max-w-md bg-gray-100 text-black p-6 rounded-lg shadow-lg">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
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
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          Create Course
        </button>

        {/* Success and Error Messages */}
        {success && <p className="mt-4 text-green-600">{success}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default CreateCourse;
