import { IsOptional, IsString, IsArray, IsEnum, IsNumber, Length, IsBoolean, IsMongoId } from 'class-validator';
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

export class UpdateQuestionBankDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  question?: string;  

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: (string | number)[];  

  @IsOptional()
  @IsString()
  correct_answer?: string | number;  

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  explanation?: string; 

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty_level?: DifficultyLevel;

  @IsOptional()
  @IsMongoId()
  module_id?: Types.ObjectId;

  @IsOptional()
  @IsEnum(QuestionType)
  question_type?: QuestionType;  

}
