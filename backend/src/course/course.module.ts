/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {  CourseSchema } from '../models/course-schema'; // Adjust the import based on your model location
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { NotificationService } from 'src/notification/notification.service';

import { ReplyService } from 'src/reply/reply.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { MessageService } from 'src/chat/message.service';
import { ForumService } from 'src/forum/forum.service';
import { ForumSchema } from '../models/forum-schema';
import { MessageSchema } from '../models/message-schema';
import { ModuleSchema } from '../models/module-schema';
import { NotificationSchema } from '../models/notification-schema';
import { ProgressSchema } from '../models/progress-schema';
import { QuizSchema } from '../models/quizzes-schema';
import { RatingSchema } from '../models/rating-schema';
import { ReplySchema } from '../models/reply-schema';
import { ResponseSchema } from '../models/responses-schema';
import { RoomSchema } from '../models/room-schema';
import { ThreadSchema } from '../models/thread-schema';
import { ProgressService } from 'src/progress/progress.service';
import { RatingService } from 'src/rating/rating.service';
import { RoomService } from 'src/room/room.service';
import { ThreadService } from 'src/thread/thread.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/auth/logger.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema },
     { name: 'UserNotification', schema: NotificationSchema },
     {name: "Message", schema: MessageSchema },
     { name: "Room", schema: RoomSchema },
     { name: "Progress", schema: ProgressSchema},
     { name: "Responses", schema: ResponseSchema},
     { name: "Quiz", schema: QuizSchema },
     { name: "Mod", schema: ModuleSchema},
     { name: "Rating", schema: RatingSchema},
     {name:"Forum",schema:ForumSchema},
     {name:"Thread",schema:ThreadSchema},
     {name:"Reply",schema:ReplySchema}
  ]),
  UserModule],
  controllers: [CourseController],
  providers: [CourseService, NotificationService, MessageService, UserService, RoomService, JwtService,
     ProgressService, AuthService, RatingService,ForumService,ThreadService,ReplyService,LoggerService

  ],
  exports:[CourseService]
})
export class CourseModule {}
