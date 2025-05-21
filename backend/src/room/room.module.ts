/* eslint-disable prettier/prettier */
// room.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Course, CourseSchema } from '../models/course-schema';
import { Room, RoomSchema } from '../models/room-schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Message, MessageSchema } from '../models/message-schema';
import { ModuleSchema } from '../models/module-schema';
import { Progress, ProgressSchema } from '../models/progress-schema';
import { Quiz, QuizSchema } from '../models/quizzes-schema';
import { Rating, RatingSchema } from '../models/rating-schema';
import { Responses, ResponseSchema } from '../models/responses-schema';
import { User, UserSchema } from '../models/user-schema';
import { ProgressService } from 'src/progress/progress.service';
import { RatingService } from 'src/rating/rating.service';
import { LoggerService } from 'src/auth/logger.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema },
      { name: Course.name, schema: CourseSchema },
      { name: User.name, schema: UserSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: Responses.name, schema: ResponseSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: 'Mod', schema: ModuleSchema },
      { name: Rating.name, schema: RatingSchema },
      { name: Message.name, schema: MessageSchema }

    ]),
  

    //CourseModule, // Import the CourseModule to use Course services
  ],
  controllers: [RoomController],
  providers: [RoomService,UserService,JwtService,ProgressService,AuthService,RatingService,LoggerService],
  exports:[RoomService]
})
export class RoomModule {}
