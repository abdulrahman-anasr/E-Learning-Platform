/* eslint-disable prettier/prettier */
import {IsString, IsOptional, IsArray, IsDate, Length } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateModuleDto {
  course_id: Types.ObjectId;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 5000)
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[];

  @IsOptional()
  @IsDate()
  created_at?: Date;
}
