import { IsString, IsArray, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType, DifficultyLevel } from './quiz.question.dto'; 
import { QuestionDto } from './quiz.question.dto'; 
export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  module_id: string; 

  @IsEnum(QuestionType)
  questionType: QuestionType; 

  @IsNotEmpty()
  @IsNumber()
  numberOfQuestions: number; 

}