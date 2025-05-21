/* eslint-disable prettier/prettier */
import { IsString, IsArray, IsMongoId, ArrayNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto {
  
  @IsString()
  name: string; // Room name

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  user_id: Types.ObjectId[]; // List of students (User IDs)

  @IsMongoId()
  course_id: Types.ObjectId; // Course ID
  
}
