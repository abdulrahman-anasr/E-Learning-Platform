/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RatingDocument = HydratedDocument<Rating>;

@Schema()
export class Rating {

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: String, required: true, enum: ['Module', 'Course', 'Instructor'] })
  ratedEntity: 'Module' | 'Course' | 'Instructor';

  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'ratedEntity', required: false })
  ratedEntityId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);


