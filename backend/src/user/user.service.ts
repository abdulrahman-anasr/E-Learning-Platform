/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, forwardRef, Inject, Injectable, Req, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import updateUserDto from './dto/updateUser.dto';
// import { Course } from '../models/course-schema';
import { Model, Types } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';
 import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

import { AuthService } from 'src/auth/auth.service';
import { RefreshAccessTokenDto } from './dto/refreshAccessTokenDto.dto';
import { Response } from 'express';
import { ProgressService } from 'src/progress/progress.service';
import { CourseDocument } from '../models/course-schema';
import { User, UserDocument } from '../models/user-schema';
import { Responses , ResponsesDocument } from 'src/models/responses-schema';
import { ModuleDocument } from 'src/models/module-schema';
import { Quiz, QuizDocument } from 'src/models/quizzes-schema';
import { Progress, ProgressDocument } from 'src/models/progress-schema';
// import { LoginDto } from './dto/loginDto.dto';
// import { RefreshAccessTokenDto } from './dto/refreshAccessTokenDto.dto';

@Injectable()
export class UserService {

    constructor(
        private readonly jwtService: JwtService, 
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel('Course') private courseModel: Model<CourseDocument>,
        @InjectModel('Mod') private moduleModel: Model<ModuleDocument>,
        @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
        @InjectModel(Responses.name) private responseModel: Model<ResponsesDocument>,
        @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
        private readonly progressService: ProgressService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }
   
    async create(userData: User): Promise<UserDocument> {
      const newUser = new this.userModel(userData);  // Create a new student document
      const user=  await newUser.save()
      return user;  // Save it to the database
  }
    

      async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find({role: { $in: ['student', 'instructor'] }}).exec();
      }
      
      async findByName(name: string): Promise<User[]> {
        // Searching for users by name (case-insensitive)
        
        return await this.userModel.find({ name: { $regex: new RegExp(name, 'i') } });
      }
      
      
      
      async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }); // Ensure `_id` is included (default behavior)
      }
      async findStudentByEmail(email: string): Promise<UserDocument | null> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
          throw new BadRequestException('User not found');
        }
        if (user.role !== 'student') {
          throw new BadRequestException('User is not a student');
        }
        return user;
      }
      
     async findAllInstructors(): Promise<User[]> {
      return await this.userModel.find({ role: 'instructor' }).exec();
    }
    async findAllByRole(role: string): Promise<User[]> {
      return await this.userModel.find({ role }).exec();
    }
    
    
    // instructor or admin Get all students
    async findStudentsByInstructor(instructorId: string): Promise<User[]> { 
      try {
        const instructor=this.userModel.findById(instructorId);
        const courses = await this.courseModel.find({ instructor: instructorId }).exec();
        if (courses.length === 0) {
          return []; // Return an empty list if the instructor has no courses
        }
    
        const courseIds = courses.map((course) => course._id); // Extract course IDs
      
        // Find students enrolled in these courses
        return await this.userModel.find({ role: 'student', course: { $in: courseIds } }).exec();
        } catch (error) {
          console.error('Token verification failed:', error);
          throw new UnauthorizedException('Instructor invalid ');
    }}
    
    
    
    // Get a student by ID malhash lazma
    async findById(id: string): Promise<User> {
      console.log("User ID in fetch is: " + id);
        const student=  await this.userModel.findById(new Types.ObjectId(id));  // Fetch a student by ID
        return student
    }

    // Update a user's details by ID 
    async update(id: string, updateData: updateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, updateData, { new: true });  // Find and update the student
    }
    
    // Delete a user  by ID admin bas aw user y delete his account
    async delete(currentUserId: string): Promise<User> {
      // Proceed with deleting the user
      const deletedUser = await this.userModel.findByIdAndDelete(currentUserId);
  
      if (!deletedUser) {
        throw new UnauthorizedException('User not found or deletion failed');
      }
  
      return deletedUser;
     }
    
    async fetchCourseCompletionRates(userId: string): Promise<any> {  
      console.log("Inside fetch course rates");
      const user = await this.userModel.findById(userId);
      const courses = await this.courseModel.find();
      const modules = await this.moduleModel.find();
      const quizzes = await this.quizModel.find();
      const responses = await this.responseModel.find();
      const userCourses = courses.filter(course => user.courses.includes(course._id));
      let courseCompletionRate= 0.0;
      let moduleCompleted = 0;
      let courseInfo : any = [];
      userCourses.forEach( (course) => {
        moduleCompleted = 0;
        console.log("Inside a course");
        const courseId = course._id;
        const courseModules = modules.filter(module => (module.course_id).toString() === courseId.toString());
        console.log("Course modules are:" + courseModules);
        courseModules.forEach((module) => {
          const moduleId = module._id;
          const moduleQuizzes = quizzes.filter(quiz => (quiz.module_id).toString() === moduleId.toString());
          console.log("Module quizzes are: " + moduleQuizzes);
          let quizCompletionRate = 0;
          moduleQuizzes.forEach((quiz) => {
            const quizId = quiz._id;
            const quizResponses = responses.filter(response => (response.quiz_id).toString() === quizId.toString());
            quizCompletionRate = quizResponses.length;
        });
        if(quizCompletionRate === moduleQuizzes.length) {
          moduleCompleted += 1;
        }
      });

      courseCompletionRate = (moduleCompleted / courseModules.length) * 100;

      courseInfo.push({ courseId: course._id, courseTitle: course.title, courseCompletionRate: courseCompletionRate });
    });
    

    console.log("Course info is: " + JSON.stringify(courseInfo));
    return courseInfo;
    }

    async logout(res: Response):Promise<any> {
      res.clearCookie('token');
      res.clearCookie('userId');
      res.clearCookie('role');
      res.clearCookie('RefreshToken');
      res.clearCookie('jwt');
      return res.status(200).send({ message: 'Logout successful' });
      
   
    }
    async getMyCourses(@Req() req): Promise<any> {
      const userId = req.cookies.userId;
      const user = await this.userModel.findById(userId);
      return user.courses;
    }
    async getStudentCourses(userId: string): Promise<any> {
      const user = await this.userModel.findById(userId);
      return user.courses;
    }

    async getInstructorsEmails(userId: string): Promise<any> {
      const user = await this.userModel.findById(userId);
      let courses = await this.courseModel.find();
      courses = courses.filter(course => user.courses.includes(course._id));
      console.log("user courses are: " + JSON.stringify(courses));

      let instructorIds = courses.map(course => course.created_by);
      let instructorIdsString = instructorIds.map(instructorId => instructorId.toString());
      console.log("instructor ids are: " + JSON.stringify(instructorIds));
      let instructors = await this.userModel.find();
      instructors = instructors.filter(instructor => instructor.role === 'instructor');
      let instructorIdsandEmails = instructors.map(instructor => ({ _id: instructor._id.toString(), email: instructor.email }));
      console.log("instructor ids and emails are: " + JSON.stringify(instructorIdsandEmails));

      instructorIdsandEmails = instructorIdsandEmails.filter(instructor => instructorIdsString.includes(instructor._id));
      console.log("filtered instructors are: " + JSON.stringify(instructorIdsandEmails));
      return instructorIdsandEmails;

    }
}

  


