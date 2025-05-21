/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Forum } from '../models/forum-schema';
import { Thread } from '../models/thread-schema'; // Assuming thread schema is defined
import { Reply } from '../models/reply-schema'; // Assuming reply schema is defined
//import { CreateFolderDto } from 'src/folder/dto/createFolder.dto';
import { CreateReplyDto } from 'src/reply/dto/createReply.dto';
import { CreateForumDto } from './dto/createForum.dto';
import { User, UserDocument } from 'src/models/user-schema';
//import { CreateThreadDto } from 'src/thread/dto/createThread.dto';



@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum.name) private forumModel: Model<Forum>,
    @InjectModel(Thread.name) private threadModel: Model<Thread>,
    @InjectModel(Reply.name) private replyModel: Model<Reply>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}


  // Create a new forum
  async create(@Req() req,createForumDto : CreateForumDto) {
    createForumDto.active = true;
    createForumDto.createdBy=req.cookies.userId;
    const forum = new this.forumModel(createForumDto);
    return forum.save();
  }

  // Get all forums
  async getForums() {
    return this.forumModel.find().exec();
  }
  async getForumById(id:string){
    return this.forumModel.findById(id);
  }
  async deleteForum(forumId: string , instructorId : string)
  {
    const forum = await this.forumModel.findById(new Types.ObjectId(forumId)).exec();
    const creatorIdString = forum.createdBy.toString();
    if(creatorIdString === instructorId)
    {
      forum.active = false;
      return forum.save();
    }
    else
    {
      return { "Message" : "You are not the creator of this forum."}
    }

  }

  
  // Create a reply in a thread
  async createReply(createReplyDto: CreateReplyDto) {
    const thread = await this.threadModel.findById(createReplyDto.thread_id);
    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    const reply = new this.replyModel(createReplyDto);
    return reply.save();
  }
  async getForumThreads(forumId: string) {
    // Validate and cast the forumId to ObjectId
    if (!Types.ObjectId.isValid(forumId)) {
      throw new Error('Invalid forum ID');
    }
    const forumObjectId = new Types.ObjectId(forumId);
    const threads = await this.threadModel.find({ forum_id: forumObjectId }).exec();
    let returnJsonArray = [];
    threads.forEach(async (thread) => {
      const user = await this.userModel.findById(thread.createdBy).exec();
      returnJsonArray.push({thread : thread , username : user.name});
    });
    return returnJsonArray;
  }
  
}
