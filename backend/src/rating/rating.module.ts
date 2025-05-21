/* eslint-disable prettier/prettier */
import { Module, Res } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RatingSchema } from '../models/rating-schema';

import { MessageService } from 'src/chat/message.service';
import { JwtService } from '@nestjs/jwt';
import { ProgressService } from 'src/progress/progress.service';

import { QuestionBankService } from 'src/questionbank/questionbank.service';
import { AuthService } from 'src/auth/auth.service';
import { ProgressSchema } from '../models/progress-schema';
import { QuestionBankSchema } from '../models/questionbank-schema';
import { QuizSchema } from '../models/quizzes-schema';
import { ReplySchema } from '../models/reply-schema';
import { ResponseSchema } from '../models/responses-schema';
import { RoomSchema } from '../models/room-schema';
import { ThreadSchema } from '../models/thread-schema';
import { QuizService } from 'src/quiz/quiz.service';
import { ResponseService } from 'src/response/response.service';
import { RoomService } from 'src/room/room.service';
import { CourseService } from 'src/course/course.service';
import { ForumService } from 'src/forum/forum.service';
import { CourseSchema } from '../models/course-schema';
import { ForumSchema } from '../models/forum-schema';
import { MessageSchema } from '../models/message-schema';
import { ModuleSchema } from '../models/module-schema';
import { NotificationSchema } from '../models/notification-schema';
import { UserSchema } from '../models/user-schema';
import { ModuleService } from 'src/module/module.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/auth/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema },{ name: 'Mod', schema: ModuleSchema },{name:'Course',schema:CourseSchema},{name:'Notification',schema:NotificationSchema},{name:'User',schema:UserSchema},{name:'Forum',schema:ForumSchema},
      {name:'Message',schema:MessageSchema},
      {name:'UserNotification',schema:NotificationSchema},
      {name:'Progress',schema:ProgressSchema},
      {name:'Reply',schema:ReplySchema},
      {name:'Thread',schema:ThreadSchema},
      {name:'Room',schema:RoomSchema},
      {name:'Responses',schema:ResponseSchema},
      {name:'Quiz',schema:QuizSchema},
      {name:'QuestionBank',schema:QuestionBankSchema}

    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService,ModuleService,CourseService,NotificationService,UserService,ForumService,MessageService,NotificationService,
    JwtService,ProgressService,AuthService,RoomService,ResponseService,QuizService,QuestionBankService,LoggerService],
    exports:[RatingService]
})

 export class RatingModule {}
