/* eslint-disable prettier/prettier */
export class UpdateResponseDto {
  user_id?: string; 

  quiz_id?: string; 

  answers?: Array<{
    questionId: string; 
    answer: string;
  }>;

  score?: number;
  
  submittedAt?: Date;
}
