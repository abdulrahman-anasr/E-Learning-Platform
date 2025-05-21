/* eslint-disable prettier/prettier */


export class CreateResponseDto {

  user_id: string;

  quiz_id: string;

  answers: Array<{
    questionId: string;
    answer: string;
  }>;

  score: number;

  submittedAt: Date;
}
