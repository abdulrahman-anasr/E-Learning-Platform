import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { InjectModel } from '@nestjs/mongoose';



@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post('create')
    async createNote(@Req() req,@Body() createNoteDto: CreateNoteDto)
    {
        console.log("Controller : Entered function createNote");
        return this.notesService.createNote(createNoteDto);
    }

    @Get('get/:id')
    async getNote(@Req() req , @Param('id') id: string)
    {
        const userId = req.cookies.userId;
        return this.notesService.getNote(id , userId);
    }

    @Get('getAll')
    async getAllNotes(@Req() req)
    {
        const userId = req.cookies.userId;
        return this.notesService.getAllNotes(userId);
    }

    @Put('update/:id')
    async updateNote(@Req() req , @Param('id') id: string , @Body() updateNoteDto: UpdateNoteDto)
    {
        const userId = req.cookies.userId;
        return this.notesService.updateNote(id, userId ,updateNoteDto);
    }

    @Delete('delete/:id')
    async deleteNote(@Req() req , @Param('id') id: string)
    {
        const userId = req.cookies.userId;
        return this.notesService.deleteNote(id, userId);
    }
}