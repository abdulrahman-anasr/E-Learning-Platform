/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema()
export class Quiz {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true })
  module_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, enum: ['MCQ', 'True/False','Both'], required: true })
  questionType: string;

  @Prop({ type: Number, min: 1, required: true })
  numberOfQuestions: number;

  @Prop({ type: Date, default: new Date(), required: true })
  created_at: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
