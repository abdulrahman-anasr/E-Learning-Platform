/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema({ timestamps: true })
export class Reply {
  @Prop({ required: true })
  content: string; // Content of the reply

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId; // Reference to the user who created the reply

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Thread', required: true })
  thread_id: Types.ObjectId; // Reference to the thread to which the reply belongs
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
