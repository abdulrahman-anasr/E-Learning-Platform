"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Types } from "mongoose";

const CreateRoom = ({courseId , userId , setRefresh} : {courseId : any , userId : any , setRefresh : Dispatch<SetStateAction<boolean>>}) => {
    axios.defaults.withCredentials = true
  const path = usePathname().split('/');
  const [formData, setFormData] = useState({
    name : "",
    course_id : courseId,
    user_id: [new Types.ObjectId(userId)],
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
        "http://localhost:3001/courses/rooms/" + courseId,
        {
          ...formData,
        },
        {withCredentials:true}
      );
      setSuccess("Room created successfully!");
      setRefresh(true);
      setFormData({
        name : "",
        course_id : courseId,
        user_id: [new Types.ObjectId(userId)]
      });
    } catch (err) {
      console.error("Error creating Room:", err);
      setError("Failed to create the Room. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-start p-1">
      <h1 className="text-4xl font-bold mb-8 text-black">Create Chatroom</h1>

      <div className="w-full max-w-md bg-gray-100 text-black p-6 rounded-lg shadow-lg">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-black">Title:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          Create Room
        </button>

        {/* Success and Error Messages */}
        {success && <p className="mt-4 text-green-600">{success}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default CreateRoom;
