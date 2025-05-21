/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user-schema';
import * as bcrypt from 'bcrypt';

import { createUserDto } from './dto/createUser.dto';
import updateUserDto from './dto/updateUser.dto';

import { AuthGuard } from '../auth/guards/auth.guards';
import { Public } from '../auth/decorators/public.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refreshAccessTokenDto.dto';
import { ProgressService } from 'src/progress/progress.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { readFileSync } from 'node:fs';

// @UseGuards(AuthGuard) //class level
@Controller('users') // it means anything starts with /student
export class UserController {
    constructor(private userService: UserService,private readonly progressService: ProgressService,private jwtService:JwtService) { }
    @Get('/all') 
    @Roles(Role.Instructor, Role.Admin)
    @UseGuards(authorizationGuard)
    // Get all students
    async getAllStudents(): Promise<User[]> {
        return await this.userService.findAll();
    }
    @Roles(Role.Instructor, Role.Admin)
    @UseGuards(authorizationGuard)
    @Get('by-email')
    async getUserByEmail(@Query('email') email: string): Promise<User> {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      return this.userService.findStudentByEmail(email);
    }
  
    @Roles(Role.Instructor, Role.Admin, Role.Student)
    @UseGuards(authorizationGuard)
    @Get('fetch/:id')// /student/:id
    // Get a single student by ID
    async getUserById(@Param('id') id: string):Promise<User> {// Get the student ID from the route parameters
        const user = await this.userService.findById(id);
        return user;
    }

    @Roles(Role.Instructor, Role.Admin, Role.Student)
    @UseGuards(authorizationGuard)
    @Get('getemails')
    async getEmails(@Req() req): Promise<any>
    {
      const userId = req.cookies.userId;
      console.log("Id passed to get emails is: " + userId);
      const emails = await this.userService.getInstructorsEmails(userId);
      return emails;
    }
    @Roles(Role.Instructor, Role.Admin, Role.Student)
    @UseGuards(authorizationGuard)
    @Get('fetchcompletionrates')
    async getCompletionRates(@Req() req): Promise<any>
    {
      const userId = req.cookies.userId;
      console.log("Id passed to get rates is: " + userId);
      const rates = await this.userService.fetchCourseCompletionRates(userId);
      return rates;
    }

    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Get('Studentfetch/:name') // /student/:id
    async getStudentsByName(@Param('name') name: string): Promise<User[]> {
      // Find all users with the same name
      const users = await this.userService.findByName(name);
      if (!users) {
        throw new BadRequestException('User not found');
      }
      if ( users.length === 0) {
        throw new BadRequestException('No students found with the provided name');
      }
    
      // Filter only students (if needed, if findByName could return all types of users)
      const students = users.filter(user => user.role === 'student');
    
      if (students.length === 0) {
        throw new NotFoundException('No students found with the provided name');
      }
    
      return students;
    }
    @Roles(Role.Student)
    @UseGuards(authorizationGuard)
    @Get('Instructorfetch/:name') // /student/:id
    async getInstructorsByName(@Param('name') name: string): Promise<User[]> {
      // Fetch all users with the same name
      const users = await this.userService.findByName(name);
  
      // If no users are found with the name
      if (!users || users.length === 0) {
        throw new BadRequestException('No users found with the provided name');
      }
  
      // Filter the users to return only instructors
      const instructors = users.filter((user) => user.role === 'instructor');
  
      // If no instructors are found
      if (instructors.length === 0) {
        throw new NotFoundException('No instructors found with the provided name');
      }
  
      return instructors;
    }
  

    @Get('fetchme')
    async getUserByReq(@Req() req): Promise<User> {
      const userId = req.cookies.userId;
      const user = await this.userService.findById(userId);
      return user;
    }

    @Roles(Role.Admin)
    @UseGuards(authorizationGuard)
    @Get('instructors')
    async getInstructors(): Promise<User[]> {
      return this.userService.findAllInstructors();
    }
    @Roles(Role.Admin,Role.Instructor)
    @UseGuards(authorizationGuard)
    @Get('instructorstudents')
    async getStudentsByInstructors(@Param('id')instructorId:string): Promise<User[]> {
      return this.userService.findStudentsByInstructor(instructorId);
    }
    // Update a student's details
    @Roles(Role.Student,Role.Instructor)
    @UseGuards(authorizationGuard)
    @Put('me')
    @UseGuards(AuthGuard)
    // Update a user's profile
async updateUserProfile(@Req() req, @Body() updateData: updateUserDto) {
  const userId = req.cookies.userId; // Extract the user ID from cookies
  
  // Check if email is being updated
  if (updateData.email) {
    // Check if the email is already taken by another user, excluding the current user
    const existingUser = await this.userService.findByEmail(updateData.email);
    if (existingUser && existingUser._id.toString() !== userId) {
      // If another user already has this email, throw an error
      throw new BadRequestException('Email is already taken by another user.');
    }
  }

  // Fetch the current user data to preserve unchanged fields
  const currentUser = await this.userService.findById(userId);
  
  if (!currentUser) {
    throw new NotFoundException('User not found');
  }

  // If no new name is provided, keep the current name
  if (!updateData.name) {
    updateData.name = currentUser.name; // Preserve the current name if not provided in the request
  }

  try {
    // Update the user's profile with the new data (name and/or email)
    const updatedUser = await this.userService.update(userId, updateData);
    console.log('Updated user data:', updatedUser);

    // Return the updated user data
    return updatedUser;
  } catch (error) {
    console.error('Error while updating user profile:', error);
    throw new UnauthorizedException('Failed to update profile due to an error.');
  }
}


    // Delete a student by ID
    @Delete('delete/:id')
    @Roles(Role.Admin)
    @UseGuards(authorizationGuard)
    async deleteUser(@Param('id')id:string) {
        const deletedUser = await this.userService.delete(id);
       return deletedUser;
    }
    @Delete('deleteme/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Student,Role.Instructor)
    @UseGuards(authorizationGuard)
    async deleteMe(@Req() req) {
      const userId = req.cookies.userId;
        const deletedUser = await this.userService.delete(userId);
       return deletedUser;
    }

    @Get('completed/:userId')
    @Roles(Role.Student)
    @UseGuards(authorizationGuard)
    async getCompletedCourses(@Req() req) {
      return await this.progressService.getCompletedCourses(req.cookies.userId);
    
    }
    @Post('logout')
    @Roles(Role.Student,Role.Instructor,Role.Admin)
    @UseGuards(authorizationGuard)
    async logout(@Res({passthrough:true}) res: Response) {
      return await this.userService.logout(res);
    }
    @UseGuards(authorizationGuard)
    @Roles(Role.Student)
    @Get('mycourses')
    getMyCourses(@Req() req) {
        return this.userService.getMyCourses(req);
    
    }
    @UseGuards(authorizationGuard)
    @Roles(Role.Instructor)
    @Get('Studentcourses/:userId')
    getStudentCourses(@Param('userId') userId: string) {
        return this.userService.getStudentCourses(userId);
}
@UseGuards(authorizationGuard)
@Roles(Role.Admin)
@Get('failed-logins')
async getFailedLogins(): Promise<any[]> {
  try {
    console.log("Fetching failed login attemps...");
    const data = readFileSync('failed-logins.log', 'utf-8');

    // Split the log file into individual lines and parse JSON
    const logs = data
      .split('\n') // Split lines
      .filter((line) => line.trim() !== '') // Remove empty lines
      .map((line) => JSON.parse(line)); // Parse each line as JSON

    // Extract relevant fields from the nested "message" object
    return logs.map((log, index) => ({
      id: index + 1, // Add an ID for easy referencing
      email: log.message.username || 'unknown', // Use "unknown" if username is missing
      reason: log.message.reason,
      createdAt: log.message.timestamp, // Extract timestamp from the message object
    }));
  } catch (err) {
    console.error('Error reading log file:', err.message);
    throw new Error('Failed to process log file');
  }
}


}