/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsArray, IsDate, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateModuleDto {
  @IsNotEmpty()
  course_id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[];

  
  @IsDate()
  created_at: Date;
}
