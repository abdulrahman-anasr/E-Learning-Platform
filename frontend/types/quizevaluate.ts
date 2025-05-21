export type Quiz = {
  _id: string;  // This is the quiz ID
  title: string;
  questions: Question[];  // Array of Question objects
};

export type Question = {
  questionId: string;  // Store questionId as a string (matching what comes from the backend)
  question: string;
  options: string[];
};

export type EvaluateQuizPayload = {
  quizId: string;  // This is the quiz ID
  userAnswers: string[];  // Array of answers
  selectedQuestions: { questionId: string }[];  // Each selected question contains a questionId
  userId: string;
};
