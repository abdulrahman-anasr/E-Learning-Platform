/* eslint-disable prettier/prettier */
import { IsMongoId, IsString, IsNotEmpty, IsArray, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class CreateForumDto {
  @IsMongoId()
  @IsNotEmpty()
  course_id: Types.ObjectId; // Reference to the associated course (use ObjectId)

  @IsString()
  @IsNotEmpty()
  forumTitle: string; // Title of the forum

  @IsMongoId()
  @IsNotEmpty()
  createdBy: Types.ObjectId; // Reference to the user who created the forum (use ObjectId)

  @IsArray()
  threads?: Types.ObjectId[]; // Array of thread references (use ObjectIds for the threads in the forum)

  @IsBoolean()
  active: boolean;
  
}
