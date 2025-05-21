/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Res, NotFoundException, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress } from '../models/progress-schema';
import { CreateProgressDTO } from './dto/createProgress.dto';
import { UpdateProgressDTO } from './dto/updateProgress.dto';
import { Response } from 'express';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) { }

  // Create a new progress record
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Post('createprogress')
  async create(@Body() progressData: CreateProgressDTO): Promise<Progress> {
    return this.progressService.create(progressData);
  }


  // Get all progress records
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get()
  async findAll(): Promise<Progress[]> {
    return this.progressService.findAll();
  }

  // Get a specific progress record by ID
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Progress> {
    return this.progressService.findOne(id);
  }
  @Roles(Role.Instructor,Role.Student)
  @UseGuards(authorizationGuard)
  @UseGuards(AuthGuard)
  @Get('myprogress')
  async getMyProgress(@Req() req): Promise<Progress> {
    const userid=req.cookies.userId;
    return this.progressService.findProgressByUserId(userid); 
  }

  // Update a specific progress record by ID
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() progressData: UpdateProgressDTO,
  ): Promise<Progress> {
    return this.progressService.update(id, progressData);
  }

  // Delete a specific progress record by ID
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.progressService.delete(id);
  }

  // Get completed courses
  @UseGuards(AuthGuard)
  @Get('completed')
  async getCompletedCourses(@Req() req) {
    const userid=req.cookies.userId;
    return await this.progressService.getCompletedCourses(userid);
  }

  // Get Enrolled courses for a student
    @Get('enrolled-courses/:userId')
  async getEnrolledCourses(@Param('userId') userId: string): Promise<Progress[]> {
    return await this.progressService.getEnrolledCourses(userId);
  }

  @Get('dashboard/:userId')
  async getDashboard(@Param('userId') userId: string, @Req() req) {
    const userIdFromCookie = req.cookies.userId; // Accessing the userId from cookies
    console.log('User ID from cookies:', userIdFromCookie);  // Debugging to see if the cookie is present
  
    if (!userIdFromCookie) {
      throw new UnauthorizedException('Unauthorized access: User is not logged in.');
    }
  
    // Make sure the userId matches the one in the cookie (optional security step)
    if (userIdFromCookie !== userId) {
      throw new UnauthorizedException('Unauthorized access: User IDs do not match.');
    }
  
    // Continue to fetch the dashboard data
    return await this.progressService.getDashboard(userId);
  }
  
  
  //getInstructorAnalyticsAssessmentResults
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get('assessment-results/:courseId')
  async getInstructorAnalyticsAssessmentResults(@Param('courseId') courseId: string) {
    return await this.progressService.getInstructorAnalyticsAssessmentResults(courseId);
  }
  //getInstructorAnalyticsContentEffectiveness
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get('content-effectiveness/:courseId')
  async getInstructorAnalyticsContentEffectiveness(@Param('courseId') courseId: string,@Req() req) {
    const userid=req.cookies.userId;
    return await this.progressService.getInstructorAnalyticsContentEffectiveness(courseId, userid);
  }

  // getInstructorAnalyticsStudentEngagement
  @Roles(Role.Instructor) 
  @UseGuards(authorizationGuard)
  @Get('student-engagement/:courseId')
  async getInstructorAnalyticsStudentEngagement(@Param('courseId') courseId: string,) {
    return await this.progressService.getInstructorAnalyticsStudentEngagement(courseId);
  }
  @Roles(Role.Instructor) 
  @UseGuards(authorizationGuard)
  @Get('/export-student-engagement/pdf/:courseId')
  async exportStudentEngagementPDF(@Param('courseId') courseId: string, @Res() res: Response) {
    await this.progressService.exportInstructorAnalyticsStudentEngagementPDF(courseId, res);
  }
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get('/export-assessment-results/pdf/:courseId')
  async exportAssessmentResultPDF(@Param('courseId') courseId: string, @Res() res: Response) {
    await this.progressService.exportInstructorAnalyticsAssessmentResultsPDF(courseId, res);
  }

  @Get('export-content-effectiveness/pdf/:courseId')
  async exportContentEffectivenessPDF(@Param('courseId') courseId: string, userId: string, @Res() res: Response) {
    await this.progressService.exportInstructorAnalyticsContentEffectivenessPDF(courseId, userId, res);
  }
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get(':userId/performance')
  async getUserPerformance(@Param('userId') userId: string) {
    const classification = await this.progressService.classifyUserPerformance(userId);
    return {
      userId,
      classification,
    };
  }
  @UseGuards(AuthGuard) 
  @Get('myperformance')
  async getMyPerformance(@Req() req) {
    const userId = req.cookies.userId;
    const classification = await this.progressService.classifyUserPerformance(userId);
    return {
      userId,
      classification,
    };
  }

  @Get('attendance-rate/:userId/:courseId')
  async getAttendanceRate(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    const rate = await this.progressService.calculateAttendanceRate(userId, courseId);
    return { attendanceRate: rate };
  }

  @Get('/instructor/:instructorId')
async getInstructorById(@Param('instructorId') instructorId: string) {
  const instructor = await this.progressService.getInstructorById(instructorId);
  if (!instructor) {
    throw new NotFoundException('Instructor not found.');
  }
  return instructor;
}


  // @Get('/instructor/:courseId')
  // async getInstructorByCourse(@Param('courseId') courseId: string) {
  //   const instructor = await this.progressService.getInstructorForCourse(courseId);
  //   if (!instructor) {
  //     throw new NotFoundException('Instructor not found for this course');
  //   }
  //   return instructor;
  // }



}
