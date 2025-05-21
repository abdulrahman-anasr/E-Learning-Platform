/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
// group chat
export type MessageDocument = HydratedDocument<Message>;

@Schema()

export class Message extends Document {
 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string; // Content of the message

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'room' })
  room_id: mongoose.Types.ObjectId;// Chat room ID (optional, if needed for group chats)

  @Prop({ type: Date, default: Date.now })
  createdAt: Date; // Timestamp when the message was sent
}

export const MessageSchema = SchemaFactory.createForClass(Message);