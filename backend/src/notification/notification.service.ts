/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {  UserNotification } from '../models/notification-schema';
import { Message } from '../models/message-schema';
import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';

import { User, UserDocument } from '../models/user-schema';
import { Course } from '../models/course-schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(UserNotification.name) private notificationModel: Model<UserNotification>, 
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService:UserService
  ) {}

  // Notify about a new course creation
  async notifyCourseCreation(
    courseId: string,
    courseName: string
  ): Promise<UserNotification> {
    const message = `A new course "${courseName}" has been created. A new forum has also been created for this course.`;
    const users=await this.userService.findAll();
    const userIds : string[] = [];
    const userIdsObj : Types.ObjectId[] = [];
    users.forEach(function(value) {
      userIds.push(value._id.toString());
    })

    userIds.forEach(function(value) {
      userIdsObj.push(Types.ObjectId.createFromHexString(value));
    })
    try {
      const notification = new this.notificationModel({
        user_id: userIdsObj,
        message,
        relatedMessageId: new Types.ObjectId(courseId), // Link the course ID for tracking
      });
      return await notification.save();
    } catch (error) {
      console.error('Error creating course notification:', error);
      throw new Error('Failed to create course notification');
    }
  }
  async notifyCourseUpdate(courseId: string, courseName: string): Promise<UserNotification> {
    try {
      // Fetch the course details
      const course = await this.courseModel.findById(courseId).exec();
  
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found.`);
      }
  
      const message = `The course "${courseName}" has been updated. Here are the updates: 
      Title: "${course.title}", 
      Description: "${course.description}", 
      Category: "${course.category}",
      Difficulty Level: "${course.difficulty_level}"`;
  
      // Notify each student
      for (const studentId of course.students as Types.ObjectId[]) {
        try {
          const student = await this.userModel.findById(studentId).exec();
          if (!student) {
            throw new Error(`Student with ID ${studentId} not found.`);
          }
  
          const notification = new this.notificationModel({
            user_id: studentId,
            message,
            relatedMessageId: courseId,
          });
  
          student.notifications.push(notification as UserNotification); // Push notification ID to student
          
          await student.save(); // Save updated student
          return await notification.save(); // Save notification
        } catch (error) {
          console.error(`Error notifying student ${studentId}:`, error);
        }
      }
    } catch (error) {
      console.error('Error creating course notification:', error);
      throw new Error('Failed to create course notification');
    }
  }
  
  async createNotificationForAllUsers(
    message: string,
   
  ): Promise<UserNotification[]> {
    try {
      // Fetch all instructors and students
      const users = await this.userModel
        .find({ role: { $in: ['instructor', 'student'] } }) // Adjust roles as per your schema
        .exec();
  
      if (!users || users.length === 0) {
        throw new Error('No users found.');
      }
  
      const userIds = users.map((user) => user._id);
  
      // Delegate the notification creation to the existing method
      return this.createNotification(userIds, message
      );
    } catch (error) {
      console.error('Error creating notifications for all users:', error);
      throw new Error('Failed to create notifications for all users');
    }
  }
  

  // Create a generic notification
  async createNotification(
    userIds: Types.ObjectId[] | Types.ObjectId,
    message: string,
    relatedMessageId?: string
  ): Promise<UserNotification[]> {
    try {
      // If a relatedMessageId is provided, append its content to the notification
      if (relatedMessageId) {
        const relatedMessage = await this.messageModel.findById(relatedMessageId).lean();
        if (relatedMessage && relatedMessage.content) {
          message += `: "${relatedMessage.content}"`;
        }
      }
  
      const userIdArray = Array.isArray(userIds) ? userIds : [userIds];
  
      // Collect created notifications
      const notifications: UserNotification[] = [];
      console.log('userIdArray', userIdArray);
      // Loop through each userId and create a notification
      for (const userId of userIdArray) {
        try {
          const student = await this.userModel.findById(userId).exec();
          if (!student) {
            throw new Error(`Student with ID ${userId} not found.`);
          }
  
          // Create the notification
          const notification = new this.notificationModel({
            user_id: userId,
            message,
            relatedMessageId,
          });
  
          // Save the notification to the student's notifications array
          student.notifications.push(notification); // Assuming `notifications` stores ObjectIds
          await student.save(); // Save updated student
  
          // Save the notification itself
          const savedNotification = await notification.save();
  
          // Add the saved notification to the array
          notifications.push(savedNotification.toObject());
        } catch (error) {
          console.error(`Error notifying student ${userId}:`, error);
        }
      }
  
      // Return the array of created notifications
      return notifications;
    } catch (error) {
      console.error('Error creating notifications:', error);
      throw new Error('Failed to create notifications');
    }
  }
  
  

  // Get all notifications for a user
  async getUserNotifications(userId: string): Promise<UserNotification[]> {
    const notifications = await this.notificationModel.find({ user_id : new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 }).exec(); 
    return notifications;
  }

  // Mark a notification as read
  async markAsRead(notificationId: string): Promise<UserNotification> {
    return this.notificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  }

  // Get notifications with additional message content
  async getUserNotificationsWithMessages(userId: string): Promise<any[]> {
    return this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate('relatedMessageId', 'content createdAt userId') // Populate message fields
      .exec();
  }

  // Get unread notifications for a user
  async getUnreadNotifications(userId: string): Promise<UserNotification[]> {
    return this.notificationModel
      .find({ userId: new Types.ObjectId(userId), read: false })
      .select('message createdAt read')
      .exec();
  }

  async getNotification(userId : string , notificationId : string) {
    const notification = await this.notificationModel.findById(new mongoose.Types.ObjectId(notificationId)).exec();
    notification.read = true;
    await notification.save();
    if(notification)
    {
      if(notification.user_id.toString() === userId)
      {
        return notification;
      }
      else
      {
        return {"Error" : "You are not authorized to view this notification"};
      }
    }
    else
    {
      return {"Error" : "Notification not found"};
    }
  }
}
