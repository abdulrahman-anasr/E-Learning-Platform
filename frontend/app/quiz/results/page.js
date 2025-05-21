"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuizResultsPage;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
function QuizResultsPage() {
    const searchParams = (0, navigation_1.useSearchParams)();
    const userId = searchParams.get("userId"); // Get userId
    const quizId = searchParams.get("quizId"); // Get quizId
    const userAnswers = searchParams.get("userAnswers"); // Encoded user answers
    const selectedQuestions = searchParams.get("selectedQuestions"); // Encoded question data
    const [score, setScore] = (0, react_1.useState)(null);
    const [feedback, setFeedback] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const evaluateQuiz = () => __awaiter(this, void 0, void 0, function* () {
            if (!userId || !quizId || !userAnswers || !selectedQuestions) {
                setError("Missing required data for evaluation.");
                return;
            }
            try {
                // Decode userAnswers and selectedQuestions
                const parsedUserAnswers = JSON.parse(decodeURIComponent(userAnswers));
                const parsedSelectedQuestions = JSON.parse(decodeURIComponent(selectedQuestions));
                // Call the backend API to evaluate the quiz
                const response = yield axios_1.default.post("http://localhost:3001/quiz/evaluate", {
                    quizId, // Include quizId in the request body
                    userAnswers: parsedUserAnswers,
                    selectedQuestions: parsedSelectedQuestions, // Pass full question data if required
                }, {
                    params: { userId }, // Include userId as a query parameter
                });
                console.log("Evaluation Response:", response.data);
                const { score, feedback } = response.data.data;
                setScore(score);
                setFeedback(feedback);
            }
            catch (err) {
                console.error("Failed to evaluate quiz:", err);
                setError("Error evaluating quiz. Please try again.");
            }
        });
        evaluateQuiz();
    }, [userId, quizId, userAnswers, selectedQuestions]);
    return (<div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      {error ? (<p className="text-red-500">{error}</p>) : (<>
          {score !== null && feedback ? (<div className="text-lg">
              <p>
                <strong>Score:</strong> {score}%
              </p>
              <p>
                <strong>Feedback:</strong> {feedback}
              </p>
            </div>) : (<p>Loading results...</p>)}
        </>)}
      <a href="/quiz/start" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Take Another Quiz
      </a>
    </div>);
}
