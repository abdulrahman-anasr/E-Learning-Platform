import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException, UseGuards } from '@nestjs/common';

import { UpdateQuestionBankDto } from './DTO/questionbank.update.dto';
import { CreateQuestionBankDto } from './DTO/questionbank.create.dto';
import { Query } from '@nestjs/common';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { QuestionBank } from '../models/questionbank-schema';
import { QuestionBankService } from './questionbank.service';
@Controller('questionbank')
export class QuestionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}

  @Roles(Role.Instructor)
@UseGuards(authorizationGuard)
  @Get('allquestionbanks')
  async getAllQuestionBanks(): Promise<QuestionBank[]> {
      return await this.questionBankService.findAll();  
  }
  
  @Roles(Role.Instructor)
  @UseGuards(authorizationGuard)
@Get('questionbank')
async getQuestionBankById(@Query('id') id: string): Promise<QuestionBank> {
  console.log('Received ID: ' + id );
  return await this.questionBankService.findById(id);
}

@Roles(Role.Instructor)
@UseGuards(authorizationGuard)
@Post('createquestion')
async createQuestionBank(
  @Body() questionBankData: CreateQuestionBankDto
): Promise<QuestionBank> {
  return await this.questionBankService.create(questionBankData);
}


@Roles(Role.Instructor)
@UseGuards(authorizationGuard)
@Put('updatequestionbank')
async updateQuestionBank(
  @Query('id') id: string,
  @Body() questionBankData: UpdateQuestionBankDto
): Promise<QuestionBank> {
  console.log('Received ID: ' + id);
  return await this.questionBankService.update(id, questionBankData);
}

@Roles(Role.Instructor)
@UseGuards(authorizationGuard)
@Delete('deletequestionbank')
async deleteQuestionBank(@Query('id') id: string): Promise<QuestionBank> {
  console.log('Received ID: ' + id);
  return await this.questionBankService.delete(id); 
}

}