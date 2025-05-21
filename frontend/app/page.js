"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
function Home() {
    return (<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Quiz App Header */}
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Welcome to the Quiz App!
        </h1>
        <p className="text-gray-600 text-sm text-center sm:text-left">
          Test your knowledge with interactive quizzes.
        </p>

        {/* Quiz Actions */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/quiz/start">
            Start a Quiz
          </a>
          <a className="rounded-full border border-solid border-blue-600 text-blue-600 transition-colors flex items-center justify-center hover:bg-blue-600 hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="/quiz/history">
            View Quiz History
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/quiz/about">
          About Quizzes
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/quiz/rules">
          Rules & Guidelines
        </a>
      </footer>
    </div>);
}
