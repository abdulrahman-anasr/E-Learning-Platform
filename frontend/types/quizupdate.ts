export type Quizupdate = {
    _id: string;
    module_id: string;
    numberOfQuestions: number;
    userId: string;
    created_at: string;
    questionType: string; // Add this field
    questions: {
      question: string;
      options: string[];
    }[];
  };
  