/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import {  NotificationSchema, UserNotification } from '../models/notification-schema';

import { RatingService } from 'src/rating/rating.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { CourseSchema } from '../models/course-schema';
import { ForumSchema } from '../models/forum-schema';
import { MessageSchema } from '../models/message-schema';
import { ModuleSchema } from '../models/module-schema';
import { ProgressSchema } from '../models/progress-schema';
import { QuestionBankSchema } from '../models/questionbank-schema';
import { NotificationsController } from './notification.controller';
import { QuizSchema } from '../models/quizzes-schema';
import { RatingSchema } from '../models/rating-schema';
import { ReplySchema } from '../models/reply-schema';
import { ResponseSchema } from '../models/responses-schema';
import { RoomSchema } from '../models/room-schema';
import { ThreadSchema } from '../models/thread-schema';
import { UserSchema } from '../models/user-schema';
import { ProgressService } from 'src/progress/progress.service';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/auth/logger.service';
import { Logger } from 'winston';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotification.name, schema: NotificationSchema },
      {name:'Message',schema:MessageSchema},
      {name:'Course',schema:CourseSchema},
      {name:'User',schema:UserSchema},
      {name:'Progress',schema:ProgressSchema},
      
            { name: 'Responses', schema: ResponseSchema }, 
            
            { name: 'Quiz', schema: QuizSchema }, 
            { name: 'Mod', schema: ModuleSchema},
            {name: 'Rating', schema: RatingSchema},
            
            {name:"Forum",schema:ForumSchema},
                 {name:"Thread",schema:ThreadSchema},
                 {name:"Reply",schema:ReplySchema},
                 { name: 'UserNotification', schema: NotificationSchema },
                
                 {name:'QuestionBank',schema:QuestionBankSchema},
                 {name:'Room',schema:RoomSchema}
      
    ]),
  ],
  providers: [NotificationService,JwtService,ProgressService,AuthService,RatingService,UserService , LoggerService],
  controllers: [NotificationsController],
  exports: [NotificationService,JwtService], // Export the service so it can be used in other modules
})
export class NotificationModule {}
