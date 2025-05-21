/* eslint-disable prettier/prettier */
import { IsOptional, IsEnum, IsNumber, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from './quiz.question.dto'; // Importing QuestionType from the other file
import { QuestionDto } from './quiz.question.dto';

export class UpdateQuizDto {
  @IsOptional()
  @IsEnum(QuestionType)
  questionType?: QuestionType; // No need to declare QuestionType here
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  numberOfQuestions?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}
