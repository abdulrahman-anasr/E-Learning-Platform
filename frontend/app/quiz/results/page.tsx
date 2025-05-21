"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizResultsPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Get userId
  const quizId = searchParams.get("quizId"); // Get quizId
  const userAnswers = searchParams.get("userAnswers"); // Encoded user answers
  const selectedQuestions = searchParams.get("selectedQuestions"); // Encoded question data

  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const evaluateQuiz = async () => {
      if (!userId || !quizId || !userAnswers || !selectedQuestions) {
        setError("Missing required data for evaluation.");
        return;
      }

      try {
        // Decode userAnswers and selectedQuestions
        const parsedUserAnswers = JSON.parse(decodeURIComponent(userAnswers));
        const parsedSelectedQuestions = JSON.parse(decodeURIComponent(selectedQuestions));

        // Call the backend API to evaluate the quiz
        const response = await axios.post(
          "http://localhost:3001/quiz/evaluate",
          {
            quizId, // Include quizId in the request body
            userAnswers: parsedUserAnswers,
            selectedQuestions: parsedSelectedQuestions, // Pass full question data if required
          },
          {
            params: { userId }, // Include userId as a query parameter
          }
        );

        console.log("Evaluation Response:", response.data);

        const { score, feedback } = response.data.data;
        setScore(score);
        setFeedback(feedback);
      } catch (err) {
        console.error("Failed to evaluate quiz:", err);
        setError("Error evaluating quiz. Please try again.");
      }
    };

    evaluateQuiz();
  }, [userId, quizId, userAnswers, selectedQuestions]);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {score !== null && feedback ? (
            <div className="text-lg">
              <p>
                <strong>Score:</strong> {score}%
              </p>
              <p>
                <strong>Feedback:</strong> {feedback}
              </p>
            </div>
          ) : (
            <p>Loading results...</p>
          )}
        </>
      )}
      <a
        href="/quiz/start"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Take Another Quiz
      </a>
    </div>
  );
}
