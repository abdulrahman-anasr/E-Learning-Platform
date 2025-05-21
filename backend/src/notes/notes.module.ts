import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteSchema } from 'src/models/note-schema';
import { Course, CourseSchema } from 'src/models/course-schema';
import { User, UserSchema } from 'src/models/user-schema';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
    controllers: [NotesController],
    providers: [NotesService]
})
export class NotesModule {}