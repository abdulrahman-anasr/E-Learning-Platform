"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";

export default function QuizStart() {
  const path = usePathname().split('/');

  const [quizData, setQuizData] = useState<any>(null); 
  const [userAnswers, setUserAnswers] = useState<string[]>([]); 
  const [step, setStep] = useState<"start" | "quiz" | "results">("start");
  const [score, setScore] = useState<number | null>(null); 
  const [feedback, setFeedback] = useState<string | null>(null); 
  const [error, setError] = useState<string | null>(null); 
  const [resultDetails, setResultDetails] = useState<any>(null);

  const userId = getCookie("userId") as string;
  const moduleId = path[path.length - 2]; 

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in cookies.");
      return;
    }
    fetchQuiz(userId, moduleId);
  }, [userId, moduleId]);


  const fetchQuiz = async (userId: string, moduleId: string) => {
    try {
      setError(null);
      const response = await axios.get(
        `http://localhost:3001/quiz/getquizzesofmodule/${moduleId}?userId=${userId}`,
        { withCredentials: true }
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch quiz.");
      }

      const quiz = response.data;
      setQuizData(quiz);
      setUserAnswers(new Array(quiz.questions.length).fill("")); 
      setStep("quiz");
    } catch (err) {
      console.error(err);
      setError("Error fetching quiz. Please try again.");
    }
  };

 
  const handleAnswerChange = (index: number, answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const submitQuiz = async () => {
    if (userAnswers.includes("")) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setError(null);
      const payload = {
        quizId: quizData.quizId,
        userAnswers,
        selectedQuestions: quizData.questions.map((q: any) => ({
          questionId: q.questionId,
        })),
        userId,
      };

      const response = await axios.post(
        `http://localhost:3001/quiz/evaluate?userId=${userId}`,
        payload,
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Failed to evaluate quiz.");
      }

      const result = response.data;
      setScore(result.score);
      setFeedback(result.feedback);
      setResultDetails(result);
      setStep("results");
    } catch (err) {
      console.error(err);
      setError("Error submitting quiz. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      {step === "start" && (
        <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-full max-w-sm shadow-lg">
          <h1 className="text-4xl font-extrabold mb-6">Start Your Quiz</h1>
          <button
            onClick={() => fetchQuiz(userId, moduleId)}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-400 transition-all duration-300"
          >
            Start Quiz
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      )}

      {step === "quiz" && quizData && (
        <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg text-black">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Quiz</h1>
          {quizData.questions.map((question: any, index: number) => (
            <div key={question.questionId} className="mb-6">
              <p className="font-semibold mb-2">{`${index + 1}: ${question.question}`}</p>
              {question.options.map((option: string, i: number) => {
                const isUserAnswer = userAnswers[index] === option;
                return (
                  <label
                    key={i}
                    className={`block p-2 rounded-lg ${
                      isUserAnswer ? "bg-gray-200 text-gray-800" : "text-gray-900"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={isUserAnswer}
                      onChange={() => handleAnswerChange(index, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          ))}
          <button
            onClick={submitQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300"
          >
            Submit Quiz
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      )}

      {step === "results" && (
        <div className="text-center p-6 bg-gray-900 text-white rounded-lg w-full max-w-lg">
          <h1 className="text-4xl font-extrabold mb-6">Quiz Results</h1>
          {score !== null && feedback ? (
            <>
              <p className="text-xl mb-4">Your Score: {score}%</p>
              <p className="text-lg mb-4">{feedback}</p>
            </>
          ) : (
            <p>Loading results...</p>
          )}
        </div>
      )}
    </div>
  );
}