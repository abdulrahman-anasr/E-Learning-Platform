/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ HydratedDocument } from 'mongoose';

export type ResponsesDocument = HydratedDocument<Responses>;


@Schema({ timestamps: true })
export class Responses {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true })
  quiz_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
        answer: { type: String, required: true },
      },
    ],
    required: true,
  })
  answers: Array<{
    questionId: mongoose.Schema.Types.ObjectId;
    answer: string;
  }>;

  @Prop({ type: Number, min: 0 })
  score: number;

  @Prop({ type: Date, default: Date.now })
  submittedAt: Date;
}

// Create the schema factory for the Response class
export const ResponseSchema = SchemaFactory.createForClass(Responses);
