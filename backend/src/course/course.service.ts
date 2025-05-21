/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, Req, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import {  Course,CourseDocument } from '../models/course-schema'; // Import NotificationService
import { NotificationService } from 'src/notification/notification.service';
import { AuthGuard as Auth } from '@nestjs/passport';
import { MessageService } from 'src/chat/message.service';
import { CreateForumDto } from 'src/forum/dto/createForum.dto';
import { ForumService } from 'src/forum/forum.service';
import { Forum, ForumDocument } from '../models/forum-schema';
import { User, UserDocument } from '../models/user-schema';
;

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Forum.name)private forumModel:Model<ForumDocument>,
    private readonly notificationService: NotificationService, // Inject NotificationService
    private readonly MessageService: MessageService,
    private readonly forumService:ForumService
    
  ) {}

  // Create a new course and notify the user
  async create(createCourseDto: CreateCourseDto, @Req() req): Promise<CourseDocument> {
    try {
      const createdCourse = new this.courseModel(createCourseDto);
      const userId = req.cookies.userId;
      console.log('Extracted User ID:', userId);
      createdCourse.created_by=userId;
      const savedCourse = await createdCourse.save();
  
      const courseName = createCourseDto.title; // Use the `title` property as the course name
      console.log(savedCourse._id.toString())
      await this.notificationService.notifyCourseCreation(
        savedCourse._id.toString(),
        courseName// Course title
         // Saved course ID
        
      );
      const createForumDto: CreateForumDto = {
        forumTitle: createCourseDto.title, // Use course title as forum title
        active: true,
        createdBy: userId,
        course_id: savedCourse._id, // Set the course ID
      };
      
      // Call forumService.create
      await this.forumService.create(req, createForumDto);
      return savedCourse;
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error('Failed to create course');
    }
  }
  

  // Find all courses
  async findAll(): Promise<CourseDocument[]> {
    return this.courseModel.find().exec();
  }

  // Find a course by ID
  async findOne(id: string): Promise<CourseDocument> {
    console.log("Course ID is: " + id);
    return this.courseModel.findById(id).exec();
  }

  // Update an existing course
  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDocument | null> {
    try {
      const course = await this.courseModel.findById(id).exec();

      console.log("UPDATEDDDDDDDDDDDDDDDDDDD");
      if (!course) {
        throw new Error(`Course with ID ${id} not found.`);
      }
      Object.assign(course, updateCourseDto); // Apply updates
  
      const updatedCourse = await course.save();

      console.log("Saved Courses");
      // Notify students about the update
      await this.notificationService.notifyCourseUpdate(
        id,
        updatedCourse.title // Pass the updated course name
      );
  
      return updatedCourse;
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error('Failed to update course');
    }
  }
  
  

  // Search for courses based on a search term
  async search(searchTerm: string): Promise<CourseDocument[]> {
    searchTerm = searchTerm.toLowerCase();
    const allCourses = await this.courseModel.find().exec();
    let instructors = await this.userModel.find().exec();
    instructors = instructors.filter(instructor => instructor.role === 'instructor');
    const filteredCourses = allCourses.filter((course) => {
      const courseName = course.title.toLowerCase();
      const courseDescription = course.description.toLowerCase();
      const courseInstructor = instructors.find(instructor => instructor._id.toString() === course.created_by.toString());
      return courseName.includes(searchTerm) || courseDescription.includes(searchTerm) || courseInstructor.name.toLowerCase().includes(searchTerm);
    });
    return filteredCourses;
  }

  // Delete a course by ID
  async delete(id: string): Promise<CourseDocument | null> {
     const course=await this.courseModel.findById(id).exec();
     course.available=false;
     return  course.save();

     // Delete the course document
  }

  async enroll(id: string, @Req() req) {
    try {
      const course = await this.courseModel.findById(id); // Fetch the course document
      const user = req.cookies.userId; // Get the user ID from cookies
      const student = await this.userModel.findById(user); // Fetch the user document
  
      if (!course) {
        throw new Error(`Course with ID ${id} not found.`);
      }
  
      if (!student) {
        throw new Error(`Student with ID ${user} not found.`);
      }
  
      const courseId = new Types.ObjectId(id);
      student.courses.push(courseId);

      course.students.push(user);
  
      await student.save();
      await course.save();
  
      return { message: 'Enrollment successful' };
    } catch (error) {
      console.error('Error during enrollment:', error);
      throw new Error('Failed to enroll the student in the course');
    }
  }
  // In CourseService (course.service.ts)
async getForumByCourseId(courseId: string): Promise<Types.ObjectId | null> {
  try {
    const forum = await this.forumModel.findOne({ course_id: courseId }).exec();
    if (!forum) {
      throw new Error(`Forum for course ID ${courseId} not found.`);
    }
    return forum._id;
  } catch (error) {
    console.error("Error fetching forum:", error);
    throw new Error("Failed to retrieve forum for the course.");
  }
}
  async enrolled(userId : string) {
    const user = await this.userModel.findById(new Types.ObjectId(userId)).exec();
    const courseeIds = user.courses;
    const courses = await this.courseModel.find({ _id: { $in: courseeIds } }).exec();
    console.log("courses are : " + courses);
    return courses;
  }
  
}

