/* eslint-disable prettier/prettier */
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReplyDto {
  @IsMongoId()
  @IsNotEmpty()
  thread_id: Types.ObjectId; // The ID of the thread to which the reply belongs

  @IsString()
  @IsNotEmpty()
  content: string; // The content of the reply

  @IsMongoId()
  @IsNotEmpty()
  createdBy: Types.ObjectId; // The user who created the reply
}
