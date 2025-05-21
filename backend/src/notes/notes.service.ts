import { Inject, Injectable } from "@nestjs/common";
import { Note , NoteDocument, NoteSchema } from "../models/note-schema";
import {User , UserDocument, UserSchema} from "../models/user-schema";
import { Course, CourseSchema } from "../models/course-schema";
import { CreateNoteDto } from "./dto/createNote.dto";
import { UpdateNoteDto } from "./dto/updateNote.dto";
import { Model } from "mongoose";
import mongoose from "mongoose";
import { create } from "domain";
import { CourseDocument } from "../models/course-schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class NotesService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
        @InjectModel('Note') private readonly noteModel: Model<NoteDocument>,
    ) {}

    async createNote(createNoteDto : CreateNoteDto)
    {
        try
        {
            const note = new this.noteModel(createNoteDto);
            await note.save();
            return "Note created";
        }
        catch(error)
        {
            throw new Error(error.message);
        }
    }

    async getNote(id : string , userId : string)
    {
        const note = await this.noteModel.findById(new mongoose.Types.ObjectId(id)).exec();
        if(note)
        {
            if(note.user_id.toString() === userId)
            {
                return note;
            }
            else
            {
                throw new Error("You are not authorized to view this note");
            }
        }
        else
        {
            throw new Error("Note not found");
        }
    }

    async updateNote(id : string , userId : string , updateNoteDto : UpdateNoteDto)
    {
        const note = await this.noteModel.findById(new mongoose.Types.ObjectId(id)).exec();
        console.log(note);
        if(note)
        {
            if(note.user_id.toString() === userId)
            {
                updateNoteDto.last_at = new Date();
                Object.assign(note, updateNoteDto);
                return note.save();
            }
            else
            {
                throw new Error("You are not authorized to update this note");
            }
        }
        else
        {
            throw new Error("Note not found");
        }
    }

    async deleteNote(id : string , userId : string)
    {
        const note = await this.noteModel.findById(new mongoose.Types.ObjectId(id)).exec();
        
        if(note)
        {
            if(note.user_id.toString() === userId)
            {
                await this.noteModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
                return "Note deleted";
            }
            else
            {
                throw new Error("You are not authorized to delete this note");
            }
        }
        else
        {
            throw new Error("Note not found");
        }
    }

    async getAllNotes(userId : string)
    {
        const notes = await this.noteModel.find({user_id : new mongoose.Types.ObjectId(userId)});
        return notes;
    }
}