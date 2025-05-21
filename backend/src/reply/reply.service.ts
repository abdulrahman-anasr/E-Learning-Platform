/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Req, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model, Types } from "mongoose";
import { CreateReplyDto } from "./dto/createReply.dto";

import { UpdateThreadDto } from "src/thread/dto/updateThread.dto";
import { UpdateReplyDto } from "./dto/updateReply.dto";
import { NotificationService } from "src/notification/notification.service";
import { Reply, ReplyDocument } from "../models/reply-schema";
import { Thread, ThreadDocument } from "../models/thread-schema";

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
    @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>,
    private readonly notificationService : NotificationService
  ) {}

  // Create a reply within a thread
  async createReply(@Req() req , createReplyDto: CreateReplyDto) {
    const { thread_id, content } = createReplyDto;
  
    // Check if the thread exists
    const thread = await this.threadModel.findById(thread_id);
    if (!thread) {
      throw new NotFoundException('Thread not found');
    }
  
    // Populate `createdBy` field using the authenticated user
    const userId = req.cookies.userId; // Get the user ID from cookies
    if (!userId) {
      throw new Error('User ID is missing from the request');
    }
  
    createReplyDto.createdBy = userId; // Assign the authenticated user as the creator
  
    // Notify the thread owner
    const message = `You have received a reply to your thread: "${content}"`;
    await this.notificationService.createNotification(thread.createdBy, message);
  
    // Save the reply to the database
    const reply = await this.replyModel.create(createReplyDto);
    return reply;
  }
  
  // Update reply
  async updateReply( @Req( )req ,updateReplyDto: UpdateReplyDto) {
    const objectId = new Types.ObjectId(updateReplyDto.reply_id);
    
    // Find the reply document
    const reply = await this.replyModel.findById(objectId);
    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    const userId = req.cookies.userId;
    if (reply.createdBy.toString() !== userId) {
      throw new UnauthorizedException("You are not authorized to edit this reply");
    }

    // Update the reply content
    reply.content = updateReplyDto.content;

    // Save the updated reply
    await reply.save();
    return reply;
  }
  
  // Delete reply
  async deleteReply(@Req () req, replyId: string) {
     const reply=await this.replyModel.findById(replyId).exec();
     const userId=req.cookies.userId;
     const userRole = req.cookies.role?.toLowerCase(); // Get role from cookies (ensure it is lowercase)
    
     if (userRole === 'instructor' || reply.createdBy.toString() === userId) {
      // If the user is an instructor or the reply creator, allow deletion
      return await this.replyModel.findByIdAndDelete(new Types.ObjectId(replyId));
    } else {
      throw new UnauthorizedException('You are not authorized to delete this reply');
    }
  }
}
