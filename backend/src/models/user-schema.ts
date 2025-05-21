/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types , Document } from 'mongoose';
import { UserNotification, NotificationSchema } from './notification-schema';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User
 {
   
    @Prop({type:String,required:true,minLength:3,maxLength:50})
    name: string;

    @Prop({type:String,
        minLength: 10,
        maxLength: 50,
        required:true})
        email:string;

    @Prop({type:String,
        minLength:5})
    password_hash:string;

    @Prop({type:String,
        enum:['student','instructor','admin'],
        required:true})
        role:string;

    @Prop({type:String,
        minLength:10,required:false})
    profile_picture_url?:string;

    @Prop({type:Date,
        default:Date.now,
        required:true})
    created_at:Date;
    
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Course' })
    courses?: mongoose.Types.ObjectId[];

    @Prop({ type: [NotificationSchema], default: [] }) // Embed notifications instead of referencing by ID
    notifications?: UserNotification[];
 
  
  // Array of notifications for the user
  @Prop({ type: String, required: false })
  refresh_token?: string; // Refresh token for the user
  


  }

  export const UserSchema = SchemaFactory.createForClass(User);