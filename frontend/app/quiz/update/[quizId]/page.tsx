"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Quizupdate } from "types/quizupdate";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";

export default function UpdateQuizPage() {
  const path = usePathname().split('/');
    
    const getInstructorData = async () => {
      const instructorId = path[path.length - 1];
      const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
      return res.json();
    };
  let quizId = path[path.length - 1]; // Quiz ID
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false); // Popup visibility
  const [quizDetails, setQuizDetails] = useState<Quizupdate | null>(null); // Quiz details
  const [updatedData, setUpdatedData] = useState<Partial<Quizupdate>>({
    questionType: "",
    numberOfQuestions: 0,
  });
  const [message, setMessage] = useState<string>("");
 const role = getCookie("role");
  console.log("Role fetched: " + role);

  const userid = getCookie("userId");
  console.log("User ID: " + userid);
  // Show popup
  const handleShowPopup = () => setIsPopupVisible(true);

  // Fetch Quiz Details
  const handleFetchQuiz = async () => {
    try {
      if (!quizId) {
        setMessage("Please enter a valid Quiz ID.");
        return;
      }

      const response = await axios.get(`http://localhost:3001/quiz/singlequiz?id=${quizId}`, 
        {withCredentials:true}
      );

      // Check if there are responses for the quiz
      if (response.data.responses && response.data.responses.length > 0) {
        setMessage("This quiz has already been taken by students and cannot be updated.");
        return;
      }

      setQuizDetails(response.data);
      setUpdatedData({
        questionType: response.data.questionType || "",
        numberOfQuestions: response.data.numberOfQuestions || 0,
      });
      setIsPopupVisible(false);
      setMessage("");
    } catch (err) {
      setMessage("Error fetching quiz. Please check the Quiz ID.");
    }
  };

  // Handle form changes
  const handleInputChange = (field: keyof Quizupdate, value: any) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
      handleFetchQuiz();
  }, [quizId]);

  // Update Quiz
  const handleUpdateQuiz = async () => {
    try {
      const payload: any = {};

      if (updatedData.questionType) {
        payload.questionType = updatedData.questionType;
      }

      if (updatedData.numberOfQuestions) {
        payload.numberOfQuestions = updatedData.numberOfQuestions;
      }

      const response = await axios.put(
        `http://localhost:3001/quiz/updatequiz?quizId=${quizId}`,
        payload,
        { withCredentials: true }
      );

      setQuizDetails(response.data);
      setMessage("Quiz updated successfully!");
    } catch (error) {
      setMessage("This quiz has already been taken by a student and cannot be edited.");
    }
  };

  console.log("Quiz ID is: " + quizId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-extrabold mb-6">Update Quiz</h1>



      {/* Quiz Details */}
      {quizDetails && (
        <div className="border p-6 mb-6 w-full max-w-md bg-white rounded-lg shadow-lg text-black">
          <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
          <p>
            <strong>Quiz ID:</strong> {quizDetails._id}
          </p>
          <p>
            <strong>Module ID:</strong> {quizDetails.module_id}
          </p>
          <p>
            <strong>Question Type:</strong> {quizDetails.questionType}
          </p>
          <p>
            <strong>Number of Questions:</strong> {quizDetails.numberOfQuestions}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(quizDetails.created_at).toLocaleString()}
          </p>
          <p>
            <strong>User ID:</strong> {quizDetails.userId}
          </p>
        </div>
      )}

      {/* Update Form */}
      {quizDetails && (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-black">
          <h2 className="text-xl font-bold mb-4">Update Quiz Details</h2>

          <label className="block mb-4 text-lg font-medium">Question Type:</label>
          <select
            onChange={(e) => handleInputChange("questionType", e.target.value)}
            value={updatedData.questionType || ""}
            className="border p-3 w-full text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Question Type</option>
            <option value="MCQ">MCQ</option>
            <option value="True/False">True/False</option>
            <option value="Both">Both</option>
          </select>

          <label className="block mb-4 text-lg font-medium">Number of Questions:</label>
          <input
            type="number"
            placeholder="Number of Questions"
            value={updatedData.numberOfQuestions || ""}
            onChange={(e) =>
              handleInputChange("numberOfQuestions", Number(e.target.value))
            }
            className="border p-3 w-full text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleUpdateQuiz}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 mt-6"
          >
            {message === "Quiz updated successfully!" ? "Updated!" : "Update Quiz"}
          </button>
        </div>
      )}

      {message && (
        <p className={`mt-6 text-lg font-medium ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}