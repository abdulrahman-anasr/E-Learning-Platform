/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type QuestionBankDocument = Document & QuestionBank;

@Schema()
export class QuestionBank {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true })
  module_id: mongoose.Schema.Types.ObjectId; 

  @Prop({ required: true })
  question: string; 

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correct_answer: string;

  @Prop({ enum: ['Easy', 'Medium', 'Hard'], required: true })
  difficulty_level: string; 
  
  @Prop({ required: false })
  explanation?: string; 

  @Prop({ enum: ['MCQ', 'True/False', 'Both'], required: false })
  question_type?: string;
}

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);