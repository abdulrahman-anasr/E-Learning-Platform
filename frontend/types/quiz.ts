export type Quiz = {
    _id: string;
    module_id: string;
    numberOfQuestions: number;
    questionType: string;
    userId: string;
    created_at: string;
    questions: {
      question: string;
      options: string[];
    }[];
  };
  