/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
// room.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from '../models/course-schema';
import { Room } from '../models/room-schema';
import mongoose, { Model, Types } from 'mongoose';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private readonly userService: UserService,
  ) {}

  // Create a new room for a specific course
  async createRoom(createRoomDto: CreateRoomDto, courseName: string, userId: string): Promise<Room> {
    // Step 1: Find the course by its title (name)
    const course = await this.courseModel.findOne({ title: courseName });
    if (!course) {
      // Instead of a generic error, throw an HTTP exception with 404 status
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  
    // Step 2: Check if the user is enrolled in the course
    const userIsEnrolled = course.students.some(
      (student: mongoose.Types.ObjectId) => student.toString() === userId
    );
    if (!userIsEnrolled) {
      // Throw an HTTP exception with 403 status if user is not enrolled
      throw new HttpException('User is not enrolled in the course', HttpStatus.FORBIDDEN);
    }
  
    // Step 3: Create the room with the associated course ObjectId
    const room = new this.roomModel({
      ...createRoomDto,
      course: course._id,  // Reference to the course's ObjectId
    });
  
    // Step 4: Save and return the room
    return room.save();
  }

  async generatePrivateRoomId(userId1: Types.ObjectId, userId2: Types.ObjectId): Promise<string> {
    // Sort user IDs so that the room ID is always the same regardless of the order
    const ids = [userId1.toString(), userId2.toString()];
    ids.sort();
    return ids.join('-'); // Example: 'user1Id-user2Id'
  }
  
  // Get rooms by course ID
  async getRoomsByCourse(courseId: string): Promise<Room[]> {
    return await this.roomModel.find({ course_id: courseId });
  }

  // Get room details by name
  async getRoomByName(roomName: string): Promise<Room> {
    const room = await this.roomModel.findOne({ name: roomName }).populate('users');
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  }

  // Mark room as inactive
  async setRoomInactive(roomId: string): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(roomId, { active: false }, { new: true });
  }

  async joinRoom(roomName : string , id: string)
  {
    const room = await this.roomModel.findOne({name : roomName});
    room.user_id.push(new Types.ObjectId(id));
    return await room.save();
  }

  async leaveRoom(roomName : string , id: string)
  {
    let room = await this.roomModel.findOne({name : roomName});
    room.user_id = room.user_id.filter(x => x.toString() !== id);
    return await room.save();
  }

  async checkUserInRoom(roomName : string , id : string)
  {
    let room = await this.roomModel.findOne({name : roomName});
    let user = room.user_id.find(x => x.toString() === id);
    if(user)
      return true;

    return false;
  }
  

}
