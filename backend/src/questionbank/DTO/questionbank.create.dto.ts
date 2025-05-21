import { IsNotEmpty, IsString, IsArray, IsOptional, IsEnum, IsNumber, Length, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum QuestionType {
  MCQ = 'MCQ',
  TrueFalse = 'True/False',
  Both = 'Both',
}

export class CreateQuestionBankDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  question: string;  

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  options: (string | number)[]; 

  @IsNotEmpty()
  @IsString()
  correct_answer: string | number;  

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  explanation?: string; 

  @IsNotEmpty()
  @IsEnum(DifficultyLevel)
  difficulty_level: DifficultyLevel;

  @IsNotEmpty()
  @IsMongoId()
  module_id: Types.ObjectId;

  @IsOptional()
  @IsEnum(QuestionType)
  question_type?: QuestionType; 

}