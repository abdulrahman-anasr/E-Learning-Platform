/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user_id: mongoose.Schema.Types.ObjectId; 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
    course_id: mongoose.Schema.Types.ObjectId; 

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String , required : true , minlength: 1})
    content: string;

    @Prop({ type: Date, default: Date.now, required: true})
    created_at: Date;

    @Prop({ type: Date, default: Date.now, required: true})
    last_at: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);