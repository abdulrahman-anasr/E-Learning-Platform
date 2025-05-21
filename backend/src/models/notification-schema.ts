/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class UserNotification extends Document {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true })
  user_id: Types.ObjectId[]; // Reference to the user receiving the notification

  @Prop({ type: String, required: true })
  message: string; // alert

  @Prop({ type: Boolean, default: false })
  read: boolean; // Status of the notification (read/unread)

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: false })
  relatedMessageId?: Types.ObjectId; // Reference to the related message (optional)

  @Prop({ type: Date, default: Date.now })
  createdAt: Date; // Timestamp when the notification was created
}

export const NotificationSchema = SchemaFactory.createForClass(UserNotification);
