import { IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class CreateNoteDto {

    @IsMongoId()
    user_id : mongoose.Types.ObjectId;

    @IsMongoId()
    course_id : mongoose.Types.ObjectId;
    title: string;
    content: string;
    created_at: Date;
    last_at: Date;
}