"use client";

import React, { useState, useEffect } from "react";
import { Quiz } from "../../../types/quiz";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function FindAllQuizzesPage() {
  const path = usePathname().split('/');
      
      const getInstructorData = async () => {
        const instructorId = path[path.length - 1];
        const res = await fetch('http://localhost:3001/users/fetch/' + instructorId, { credentials: 'include' });
        return res.json();
      };
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/quiz/findall`,{withCredentials:true});
        if (response.status !== 200) {
          throw new Error("Failed to fetch quizzes");
        }
        const data: Quiz[] = await response.data;
        setQuizzes(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
      <main className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6">All Quizzes</h1>
        {error && <p className="text-red-400">{error}</p>}
        <ul className="list-disc space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="p-4 border rounded-lg bg-gray-800">
              <div>
                <p>
                  <strong>ID:</strong> {quiz._id}
                </p>
                <p>
                  <strong>Module:</strong> {quiz.module_id}
                </p>
                <p>
                  <strong>Number of Questions:</strong> {quiz.numberOfQuestions}
                </p>
                <p>
                  <strong>User ID:</strong> {quiz.userId}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(quiz.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <strong>Questions:</strong>
                <ul className="list-decimal pl-6">
                  {quiz.questions.map((question, index) => (
                    <li key={index}>
                      <p>
                        <strong>Question:</strong> {question.question}
                      </p>
                      <p>
                        <strong>Options:</strong> {question.options.join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
