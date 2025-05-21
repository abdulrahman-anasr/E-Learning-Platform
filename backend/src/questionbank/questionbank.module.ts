/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionBankController } from './questionbank.controller';
import { QuestionBankService } from './questionbank.service';
import { QuizSchema } from '../models/quizzes-schema';
import { ModuleSchema } from '../models/module-schema';
import { QuestionBankSchema } from '../models/questionbank-schema';
import { UserSchema } from '../models/user-schema';
import { LoggerService } from 'src/auth/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: 'Module', schema: ModuleSchema }]),
    MongooseModule.forFeature([{ name: 'QuestionBank', schema: QuestionBankSchema }]),
    MongooseModule.forFeature([{name: 'User' , schema : UserSchema}])
  ],
  controllers: [QuestionBankController],
  providers: [QuestionBankService,LoggerService],
})
export class QuestionBankModule {}
