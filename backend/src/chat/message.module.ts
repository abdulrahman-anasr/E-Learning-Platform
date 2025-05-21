/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../models/message-schema';
import { RoomSchema } from '../models/room-schema';
import { NotificationService } from "src/notification/notification.service";
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Course, CourseSchema } from '../models/course-schema';
import { ModuleSchema } from '../models/module-schema';
import { UserNotification, NotificationSchema } from '../models/notification-schema';
import { Progress, ProgressSchema } from '../models/progress-schema';
import { Quiz, QuizSchema } from '../models/quizzes-schema';
import { Rating, RatingSchema } from '../models/rating-schema';
import { RefreshToken, RefreshTokenSchema } from '../models/refreshToken-schema';
import { Responses, ResponseSchema } from '../models/responses-schema';
import { User, UserSchema } from '../models/user-schema';
import { ProgressService } from 'src/progress/progress.service';
import { RatingService } from 'src/rating/rating.service';
import { LoggerService } from 'src/auth/logger.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema },{ name: 'Room', schema: RoomSchema },
    { name: UserNotification.name, schema: NotificationSchema } , { name: Course.name, schema: CourseSchema } , 
    { name: User.name, schema: UserSchema } , { name: Progress.name, schema: ProgressSchema } , { name: Responses.name, schema: ResponseSchema },
    { name: Quiz.name, schema: QuizSchema } , { name: 'Mod', schema: ModuleSchema } , { name: Rating.name, schema: RatingSchema },
    { name: RefreshToken.name, schema: RefreshTokenSchema }
  ])],
  providers: [MessageService, MessageGateway, RoomService,
    UserService,
    NotificationService,
  JwtService , ProgressService , AuthService , RatingService,LoggerService],
  exports:[MessageService]
})
export class ChatModule {}