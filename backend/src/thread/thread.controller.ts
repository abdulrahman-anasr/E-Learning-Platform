/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Body, Query, Delete, Req, UseGuards, Param} from '@nestjs/common';
import { CreateThreadDto } from './dto/createThread.dto';
import { UpdateThreadDto } from './dto/updateThread.dto';
import { ThreadService } from './thread.service';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { Thread } from 'src/models/thread-schema';



@Controller('threads')
export class ThreadController {
    constructor(private readonly threadService: ThreadService) {}
    
 @Roles(Role.Instructor,Role.Student)
  @UseGuards(authorizationGuard)
    @Post('create')
    async createThread(@Req() req,@Body() createThreadDto: CreateThreadDto) {
        return this.threadService.createThread(req,createThreadDto);
    }
    @Roles(Role.Instructor,Role.Student)
    @UseGuards(authorizationGuard)
    @Put('update/:id')
    async updateThread(@Req() req,@Body() updateThreadDto: UpdateThreadDto) {
        return this.threadService.updateMyThread(req,updateThreadDto);
    }
    @Roles(Role.Instructor,Role.Student)
    @UseGuards(authorizationGuard)
    @Get('search')
    async searchThreads(@Query('keyword') keyword: string) {
        return this.threadService.searchThreadsByKeyword(keyword);
    }
    @Roles(Role.Instructor, Role.Student)
    @UseGuards(authorizationGuard)
    @Delete('delete')
    async deleteThread(@Req() req, @Query('id') id: string) {
      const userId = req.cookies.userId; // Extract the userId from cookies
      return this.threadService.deleteThread(req, id);
    }
    
    @Roles(Role.Instructor,Role.Student)
    @UseGuards(authorizationGuard)
    @Get('getAllThreads')
    async getAllThreads(@Req() req)
    {
        const userid=req.cookies.userId;
    return this.threadService.getAllThreads(userid);
    }

    @Roles(Role.Instructor,Role.Student)
    @UseGuards(authorizationGuard)
    @Get('getReplies')
    async getReplies(@Query('id') id: string )
    {
    return this.threadService.getThreadReplies(id);
    }
    @Roles(Role.Instructor,Role.Student)
    @UseGuards(authorizationGuard)
    @Get('by-forum/:forumId')
  async getThreadsByForumId(@Param('forumId') forumId: string): Promise<Thread[]> {
    return this.threadService.getThreadsByForumId(forumId);
  }

}
//a instructor can delete any thread
//a student can delete only their own thread
