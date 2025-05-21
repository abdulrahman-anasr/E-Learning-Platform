/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
 
export type RoomDocument = HydratedDocument<Room>;


@Schema()
export class Room {
  @Prop({ type: String, required: true })
  name: string; // Name of the room

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true })
  user_id: Types.ObjectId[]; // List of users in the room

  // Unique identifier for the room
  @Prop({ type: Boolean, required: true , default: true })
  room_status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  course_id: Types.ObjectId; // Reference to the related course
}

export const RoomSchema = SchemaFactory.createForClass(Room);
