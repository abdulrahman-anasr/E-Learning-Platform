import mongoose from 'mongoose';

export class UpdateNoteDto {
    title?: string;
    content?: string;
    last_at: Date;
}