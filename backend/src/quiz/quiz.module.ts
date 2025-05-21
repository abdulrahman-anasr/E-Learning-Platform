/* eslint-disable prettier/prettier */
import { forwardRef, Module as yarab } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { quizController } from './quiz.controller';
import { QuizService } from './quiz.service';

import { ThreadService } from 'src/thread/thread.service';
import { ReplySchema } from '../models/reply-schema';
import { ReplyService } from 'src/reply/reply.service';
import { RoomService } from 'src/room/room.service';
import { RoomSchema } from '../models/room-schema';
import { AuthService } from 'src/auth/auth.service';
import { ProgressService } from 'src/progress/progress.service';
import { RatingService } from 'src/rating/rating.service';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from 'src/chat/message.service';
import { CourseService } from 'src/course/course.service';
import { ForumService } from 'src/forum/forum.service';
import { CourseSchema } from '../models/course-schema';
import { ForumSchema } from '../models/forum-schema';
import { MessageSchema } from '../models/message-schema';
import { NotificationSchema} from '../models/notification-schema';
import { ProgressSchema } from '../models/progress-schema';
import { QuestionBankSchema } from '../models/questionbank-schema';
import { QuizSchema } from '../models/quizzes-schema';
import { RatingSchema } from '../models/rating-schema';
import { ResponseSchema } from '../models/responses-schema';
import { ThreadSchema } from '../models/thread-schema';
import { UserSchema } from '../models/user-schema';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/auth/logger.service';
import { ModuleSchema } from '../models/module-schema';
import { ProgressModule } from 'src/progress/progress.module';
@yarab({
  imports: [
    MongooseModule.forFeature([
      { name: 'Quiz', schema: QuizSchema },
      { name: 'Mod', schema: ModuleSchema },
      { name: 'QuestionBank', schema: QuestionBankSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Progress', schema: ProgressSchema} ,
      { name: 'Responses', schema: ResponseSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'UserNotification', schema: NotificationSchema },
      { name: 'Forum', schema: ForumSchema },
      { name: 'Message', schema: MessageSchema },
      { name: 'Thread', schema: ThreadSchema },
      { name: 'Reply', schema: ReplySchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'Rating', schema: RatingSchema },
    ]) ,
    forwardRef(() => ProgressModule),
  ],
  controllers: [quizController],
  providers: [QuizService,RatingService,JwtService,CourseService,NotificationService,ForumService,MessageService,UserService,ThreadService,ReplyService,RoomService,AuthService,ProgressService,LoggerService],
  exports:[QuizService]

})
export class QuizModule {}