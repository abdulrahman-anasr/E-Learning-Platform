/* eslint-disable prettier/prettier */
// SWE-PROJ/backend/src/course/course.controller.ts
import { Controller, Post, Body, Put, Param, Query, Delete, Req, UseGuards, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/createCourse.dto'; 
import { UpdateCourseDto } from './dto/updateCourse.dto'; 
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Post('create')
    create(@Req() req,@Body() createCourseDto: CreateCourseDto) {
        console.log('Creating course:', createCourseDto);
        return this.courseService.create(createCourseDto, req);
    }
    @Roles(Role.Instructor,Role.Student,Role.Admin)
    @Get('getAll')
    findAll() {
        return this.courseService.findAll();
    }
    @Roles(Role.Admin,Role.Instructor)
    @UseGuards(authorizationGuard)
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.courseService.delete(id);
    }

    @Get('search')
    @Roles(Role.Student,Role.Instructor,Role.Admin)
    @UseGuards(authorizationGuard)
    search(@Query('query') query: string){
        console.log('Search Query: ', query)
        return this.courseService.search(query);
    }

    @Get('/:id')
    @Roles(Role.Instructor,Role.Admin , Role.Student)
    @UseGuards(authorizationGuard)
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Put('/:id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }

    @Roles(Role.Student)
    @UseGuards(authorizationGuard)
    @Post('enroll/:id')
    enroll(@Param('id') id: string, @Req() req) {
        console.log("Enrolling student");
        this.courseService.enroll(id,req);
    }
    @Roles(Role.Student,Role.Instructor)
    @UseGuards(authorizationGuard)
    @Get('forum/:courseId')
    async getForumForCourse(@Param('courseId') courseId: string) {
        try {
            const forum = await this.courseService.getForumByCourseId(courseId);
            return forum;
        } catch (error) {
            throw new Error('Unable to fetch the forum for this course.');
        }
    }
    @UseGuards(authorizationGuard)
    @Get('enrolls/find')
    @Roles(Role.Student)
    enrolled(@Req() req) {
        const userId = req.cookies.userId;
        return this.courseService.enrolled(userId);
    }
   
    }

