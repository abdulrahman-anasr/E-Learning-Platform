/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';  // UserModule is already imported
import { ProgressModule } from './progress/progress.module';  // Import ProgressModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthGuard } from './auth/guards/auth.guards';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { APP_GUARD, Reflector } from '@nestjs/core';

import {BackupModule} from './backup/backup.module'
import { ChatModule } from './chat/message.module';
import { ForumModule } from './forum/forum.module';
import { ThreadModule } from './thread/thread.module';
import { ReplyModule } from './reply/reply.module';
import { InteractiveModule } from './module/module.module';

import { QuestionBankModule } from './questionbank/questionbank.module';
import { RatingModule } from './rating/rating.module';
import { ResponseModule } from './response/response.module';
//import { QuizModule } from './quiz/quiz.module';
import { NotificationModule } from './notification/notification.module';
import { RoomModule } from './room/room.module';

import { NotesModule } from './notes/notes.module';
import { QuizModule } from './quiz/quiz.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE),
  
    AuthModule,
    UserModule,
    ProgressModule,
    CourseModule,
    ResponseModule,
    RatingModule,
    NotificationModule,
    BackupModule,
    ChatModule,
     // Ensure UserModule is imported here
     // Import ProgressModule to make ProgressService available,
     ForumModule,
     ThreadModule,
     ReplyModule,
     InteractiveModule,
     QuestionBankModule,
     RoomModule,
     NotesModule,
     QuizModule,

    /*
  
    
   
   
   
   
*/
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log('JWT_SECRET1:', process.env.JWT_SECRET); // Log the secret value
    console.log('Port:',process.env.DATABASE)
  }
}
