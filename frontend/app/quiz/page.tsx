"use client";

export default function QuizPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
      <main className="text-center">
        <h1 className="text-5xl font-bold mb-6">Quiz Management</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <a
            className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/quiz/create"
          >
            Create a Quiz
          </a>
          <a
            className="rounded-lg bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/quiz/findall"
          >
            Find All Quizzes
          </a>
          <a
            className="rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/quiz/update"
          >
            Update Quiz
          </a>
          <a
            className="rounded-lg bg-gradient-to-r from-red-600 to-red-400 text-white shadow-lg hover:scale-105 transition-transform duration-200 text-lg h-14 px-8 flex items-center justify-center"
            href="/quiz/delete"
          >
            Delete Quiz
          </a>
        </div>
      </main>
    </div>
  );
}
