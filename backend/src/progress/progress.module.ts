/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressSchema } from '../models/progress-schema';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import {ResponseSchema} from '../models/responses-schema';
import { CourseSchema } from '../models/course-schema';
import { QuizSchema } from '../models/quizzes-schema';
import {ModuleSchema } from '../models/module-schema';
import { RatingSchema } from '../models/rating-schema';
import { RatingService } from '../rating/rating.service';

import { JwtService } from '@nestjs/jwt';
import { ResponseService } from 'src/response/response.service';

import { CourseService } from 'src/course/course.service';
import { QuizService } from 'src/quiz/quiz.service';
import { ModuleService } from 'src/module/module.service';
import { UserSchema } from '../models/user-schema';

import { ReplyService } from 'src/reply/reply.service';
import { AuthService } from 'src/auth/auth.service';
import { MessageService } from 'src/chat/message.service';
import { ForumService } from 'src/forum/forum.service';
import { ForumSchema } from '../models/forum-schema';
import { MessageSchema } from '../models/message-schema';
import { NotificationSchema } from '../models/notification-schema';
import { QuestionBankSchema } from '../models/questionbank-schema';
import { ReplySchema } from '../models/reply-schema';
import { RoomSchema } from '../models/room-schema';
import { ThreadSchema } from '../models/thread-schema';
import { NotificationService } from 'src/notification/notification.service';
import { RoomService } from 'src/room/room.service';
import { ThreadService } from 'src/thread/thread.service';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/auth/logger.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Progress', schema: ProgressSchema },
      { name: 'Responses', schema: ResponseSchema }, 
      { name: 'Course', schema: CourseSchema }, 
      { name: 'Quiz', schema: QuizSchema }, 
      { name: 'Mod', schema: ModuleSchema},
      {name: 'Rating', schema: RatingSchema},
      {name: 'User', schema: UserSchema},
      {name: 'Forum', schema: ForumSchema},
      {name:'UserNotification', schema:NotificationSchema},
      {name:'QuestionBank', schema:QuestionBankSchema},
      {name:'Message', schema:MessageSchema},
      {name:'Room', schema:RoomSchema},
      {name:'Reply', schema:ReplySchema},
      {name:'Thread', schema:ThreadSchema},

      

    ]), 



  ],
  controllers: [ProgressController],
  providers: [ProgressService, RatingService,JwtService,ResponseService,CourseService,QuizService,ModuleService,NotificationService,
    MessageService,ForumService,UserService,RoomService,ThreadService,ReplyService,AuthService,LoggerService
  ],
  exports: [ProgressService],
})
export class ProgressModule {}
