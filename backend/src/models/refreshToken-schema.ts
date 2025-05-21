/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { User } from './user-schema';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class RefreshToken extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;

  @Prop({ required: true })
  refreshToken: string;



  @Prop({ required: true })
  browser: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);