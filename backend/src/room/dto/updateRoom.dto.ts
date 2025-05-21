/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IsString, IsArray, IsMongoId, ArrayNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  name?: string; // Optional: Room name (if updating)

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  students?: Types.ObjectId[]; // Optional: List of students (if updating)

  @IsMongoId()
  @IsOptional()
  instructor?: Types.ObjectId; // Optional: Update the instructor (if needed)
}
