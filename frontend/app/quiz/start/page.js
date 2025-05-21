"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StartQuizPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function StartQuizPage() {
    const router = (0, navigation_1.useRouter)();
    const [showPopup, setShowPopup] = (0, react_1.useState)(false);
    const [userId, setUserId] = (0, react_1.useState)("");
    const handleStartQuiz = () => {
        if (userId.trim()) {
            router.push(`/quiz/content?userId=${userId}`); // Redirect to content page with userId
        }
        else {
            alert("Please enter a valid User ID");
        }
    };
    return (<div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz</h1>
      <button onClick={() => setShowPopup(true)} // Show the input popup
     className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Quiz
      </button>

      {/* Popup for User ID input */}
      {showPopup && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Enter Your User ID</h2>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="w-full px-3 py-2 border rounded mb-4"/>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowPopup(false)} // Close the popup
         className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleStartQuiz} // Submit User ID
         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </div>)}
    </div>);
}
