/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true})
  category: string;

  @Prop({ type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] })
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';

  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  created_by: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: () => new Date(), required: true })
  created_at: Date;

  @Prop({ type: [String], default: [] })
  versions: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  instructor: mongoose.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  students: mongoose.Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  available: boolean;
}


export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index({ title: 'text', description: 'text' });
