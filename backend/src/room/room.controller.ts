/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { Room, RoomDocument } from '../models/room-schema';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CourseDocument } from '../models/course-schema';
import { MessageDocument } from '../models/message-schema';

@Controller('courses/rooms')
export class RoomController {
  constructor(
  @InjectModel('Message') private readonly messageModel: Model<MessageDocument>,
  @InjectModel('Room') private readonly roomModel: Model<RoomDocument>,
  @InjectModel('Course') private readonly courseModel : Model<CourseDocument>,

    
  private readonly roomService: RoomService) {}


@Get('/:courseId')
async getRooms(
  @Param('courseId') courseId: string, // Course ID from the route params
  @Req() req
): Promise<Room[]> {
  const userId = req.cookies.userId;
  // Step 1: Find the course by its ID
  const course = await this.courseModel.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Step 2: Check if the user is enrolled in the course
  const userIsEnrolled = course.students.some(
    (student: mongoose.Types.ObjectId) => student.toString() === userId.toString()
  );
  const isInstructor = course.created_by.toString() === userId.toString();
  if (!userIsEnrolled && !isInstructor) {
    throw new Error('User is not enrolled in the course');
  }

  // Step 3: Get all rooms for the course
  const rooms = await this.roomService.getRoomsByCourse(courseId);

  // Step 4: Return the rooms
  return rooms;
}

  // Create a group chat room for a course
@Post('/:courseId')
async createRoom(
  @Body() createRoomDto: CreateRoomDto, // Room data from the request body
  @Param('courseId') courseId: Types.ObjectId, // Course ID from the route params
  @Req() req
): Promise<Room> {
  const userId = req.cookies.userId;
  // Step 1: Find the course by its ID
  const course = await this.courseModel.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Step 2: Check if the user is enrolled in the course
  const userIsEnrolled = course.students.some(
    (student: mongoose.Types.ObjectId) => student.toString() === userId.toString()
  );
  const isInstructor = course.created_by.toString() === userId.toString();
  if (!userIsEnrolled && !isInstructor) {
    throw new Error('User is not enrolled in the course');
  }

  // Step 3: Create the room
  const room = new this.roomModel({
    ...createRoomDto,
    course: courseId, // Pass the course ObjectId to the room
  });

  // Step 4: Save and return the room
  return room.save();
}

  
  // Get a specific room by its ID
  @Get('name/:name')
  async getRoomByName(@Param('name') roomName: string): Promise<Room> {
    return this.roomService.getRoomByName(roomName);
  }


  
}
