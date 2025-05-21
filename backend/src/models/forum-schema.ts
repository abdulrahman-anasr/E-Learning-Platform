/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

import {  Schema as MongooseSchema } from 'mongoose';
 // Import the folder schema

export type ForumDocument = HydratedDocument<Forum>;

@Schema({ timestamps: true })
export class Forum {
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course_id: Types.ObjectId; // Reference to the associated course

  @Prop({ required: true })
  forumTitle: string; // Title of the forum

  //Should or should not???
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId; // Reference to the user who created the forum

  @Prop({type: Boolean ,required: true })
  active: boolean; // Reference to the user who created the forum

}

export const ForumSchema = SchemaFactory.createForClass(Forum);
