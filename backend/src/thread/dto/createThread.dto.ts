/* eslint-disable prettier/prettier */
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
//import { Types } from 'mongoose';

export class CreateThreadDto {

  @IsString()
  @IsNotEmpty()
  threadTitle: string; // The title of the thread

  @IsString()
  @IsNotEmpty()
  content: string; // The content of the thread

  @IsMongoId()
  @IsNotEmpty()
  forum_id: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  createdBy: string; // The user who created the thread
}
