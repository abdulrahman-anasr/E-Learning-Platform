import { IsString, IsArray, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export enum QuestionType {
  MCQ = 'MCQ',
  TrueFalse = 'True/False',
  Both = 'Both',
}

export enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  options: string[]; 

  @IsString()
  @IsNotEmpty()
  correctAnswer: string; 
  
  @IsOptional() 
  @IsEnum(DifficultyLevel)
  difficultyLevel?: DifficultyLevel;

  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // Ensure every element in the array is a string
  questionIds?: string[]; 
  
}