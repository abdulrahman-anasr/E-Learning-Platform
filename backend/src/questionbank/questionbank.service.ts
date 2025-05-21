/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { QuestionBank } from '../models/questionbank-schema';
import { Quiz } from '../models/quizzes-schema';
import { User } from '../models/user-schema';
import { CreateQuestionBankDto } from './DTO/questionbank.create.dto';
import { UpdateQuestionBankDto } from './DTO/questionbank.update.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
    @InjectModel('QuestionBank') private readonly questionBankModel: Model<QuestionBank>,
    @InjectModel('User') private readonly userModel: Model<User> 
  ) {}

 
  async findAll(): Promise<QuestionBank[]> {
    return await this.questionBankModel.find().exec();
}

  async findById(id: string): Promise<QuestionBank> {
    const inpStrId: string = id;
    const objectId = new mongoose.Types.ObjectId(inpStrId);
    return await this.questionBankModel.findById(objectId).exec();
  }
  
  async create(createQuestionBankDto: CreateQuestionBankDto): Promise<QuestionBank> {
    const newQuestionBank = new this.questionBankModel(createQuestionBankDto);
    return await newQuestionBank.save();
  }
  
  
  async update(id: string, updateData: UpdateQuestionBankDto): Promise<QuestionBank> {
    const inpStrId: string = id;
    const objectId = new mongoose.Types.ObjectId(inpStrId);
    return await this.questionBankModel.findByIdAndUpdate(objectId, updateData, { new: true }).exec();
  }
  
  
  async delete(id: string): Promise<QuestionBank> {
    const inpStrId: string = id;
    const objectId = new mongoose.Types.ObjectId(inpStrId);
    return await this.questionBankModel.findByIdAndDelete(objectId).exec(); 
  }
  
} 