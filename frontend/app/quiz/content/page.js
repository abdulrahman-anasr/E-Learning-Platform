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
exports.default = QuizContentPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const axios_1 = __importDefault(require("axios"));
function QuizContentPage() {
    const searchParams = (0, navigation_1.useSearchParams)();
    const userId = searchParams.get("userId"); // Extract userId from query params
    const [quizData, setQuizData] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [userAnswers, setUserAnswers] = (0, react_1.useState)([]);
    const router = (0, navigation_1.useRouter)();
    // Fetch the quiz assigned to the user
    (0, react_1.useEffect)(() => {
        const fetchQuiz = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("http://localhost:3001/quiz/assigned", {
                    params: { userId },
                });
                console.log("API Response:", response.data);
                const quiz = response.data;
                if (quiz && quiz.questions) {
                    setQuizData(Object.assign(Object.assign({}, quiz), { quizId: quiz._id }));
                    setUserAnswers(new Array(quiz.questions.length).fill("")); // Initialize empty answers
                }
                else {
                    setError("No quiz found for this user.");
                }
            }
            catch (err) {
                console.error("Failed to fetch quiz:", err);
                setError("Error fetching quiz. Please try again.");
            }
        });
        if (userId) {
            fetchQuiz();
        }
    }, [userId]);
    // Handle radio button changes
    const handleOptionChange = (index, option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = option;
        setUserAnswers(updatedAnswers);
    };
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (!quizData || !userId) {
            console.error("Missing quiz data or userId");
            setError("Cannot submit quiz due to missing data.");
            return;
        }
        try {
            // Build answers payload with questionId and userAnswer
            const answers = quizData.questions.map((q, index) => ({
                questionId: q.questionId, // Correct question ID
                answer: userAnswers[index] || "", // User-selected answer
            }));
            // Send request to evaluate the quiz
            const response = yield axios_1.default.post("http://localhost:3001/quiz/evaluate", {
                quizId: quizData.quizId, // Pass quizId explicitly
                answers: answers, // Structured answers array
            }, { params: { userId } } // Send userId in query params
            );
            console.log("Evaluation Response:", response.data);
            // Extract score and feedback
            const { score, feedback } = response.data.data;
            // Redirect to the results page with score and feedback
            router.push(`/quiz/results?score=${score}&feedback=${encodeURIComponent(feedback)}`);
        }
        catch (err) {
            console.error("Failed to submit quiz:", err);
            setError("Error submitting quiz. Please try again.");
        }
    });
    return (<div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Content</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {quizData ? (<form onSubmit={(e) => e.preventDefault()}>
          {quizData.questions.map((q, idx) => (<div key={q.questionId || idx} className="mb-6">
              <h3 className="text-lg font-medium">
                Q{idx + 1}: {q.question}
              </h3>
              {q.options.map((option) => (<label key={option} className="block">
                  <input type="radio" name={`question-${idx}`} value={option} checked={userAnswers[idx] === option} onChange={() => handleOptionChange(idx, option)} className="mr-2"/>
                  {option}
                </label>))}
            </div>))}
          <button type="button" onClick={handleSubmit} className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
            Submit Quiz
          </button>
        </form>) : (<p>Loading quiz...</p>)}
    </div>);
}
