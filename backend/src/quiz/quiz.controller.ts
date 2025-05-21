/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service'; 
 
import { CreateQuizDto } from './DTO/quiz.create.dto';
import { UpdateQuizDto } from './DTO/quiz.update.dto';
import { Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { Quiz } from '../models/quizzes-schema';

interface DeleteQuizResponse {
  success: boolean;
  message: string;
  data: Quiz | null;
}

@Controller('quiz')
export class quizController {
    constructor(private readonly quizService: QuizService) {} 

    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard) 
    @Post('createQuiz')
    async createQuiz(
      @Body() createQuizDto: CreateQuizDto,
    )
    {
      this.quizService.createQuiz(createQuizDto);
    }
    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Get('singlequiz')
    async getQuizById(@Query('id') id: string): Promise<Quiz> {
        console.log('Received ID: ' + id);
        const quiz = await this.quizService.findById(id);  
        return quiz;
    }
    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
      @Put('updatequiz')
      async updateQuiz(
        @Req() req,
        @Query('quizId') quizId: string, 
        @Body() updateData: UpdateQuizDto
      ): Promise<Quiz> {
        console.log("Received ID:", quizId);
        console.log("Update Data:", updateData); // Debugging log
      
        // Ensure the data is valid
        if (!quizId || !updateData) {
          throw new BadRequestException('Quiz ID or update data is missing.');
        }
      
        // Fetch the quiz document using the quizId
        const quiz = await this.quizService.findById(quizId);
      
        if (!quiz) {
          throw new BadRequestException('Quiz not found.');
        }     
        // Ensure userId is a string
  
  // Pass the userId to the service method
        return await this.quizService.update(quizId, updateData);
    }

    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)    
    @Get('findall')
    async getAllQuizzes(): Promise<Quiz[]> {
        return await this.quizService.findAll();
    }

    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Get('getresponsestotal')
  async getResponsesTotal(@Query('id') id: string): Promise<any> {
    console.log('Received ID: ' + id);
    const quiz = await this.quizService.getresponsestotal(id);
    return quiz;
  }
    @Get('generatequizforstudent/:id')
    async generateQuizForStudent(@Param('id') id: string , @Req() req): Promise<Quiz> {
      console.log("Fetching quiz tailored for student");
      const quiz = await this.quizService.generateQuiz(id , req.cookies.userId);
      return quiz;
    }


    @Roles(Role.Student , Role.Instructor)
    @UseGuards(authorizationGuard)
    @Get('getquizzesofmodule/:id')
    async getQuizzesOfModule(@Param('id') id: string): Promise<Quiz[]> {
      console.log("Received ID in get quizzes module:", id);
      const quiz = await this.quizService.getQuizzesOfModule(id);
      return quiz;
    }
    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Delete('deletequiz')
    async deleteQuiz(@Query('id') id: string): Promise<any> {
      console.log("Received quiz ID for deletion:", id);  // Log quizId received from frontend

      try {
        const deletedQuiz = await this.quizService.delete(id); // Calling service method
        return { success: true, message: 'Quiz deleted successfully!' };
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw new UnauthorizedException('This quiz has already been taken by a student and cannot be deleted.');
        }
        throw new BadRequestException('Quiz not found or already deleted.');
      }
    }

  @Post('evaluate')
  async evaluateQuiz(
    @Body('quizId') quizId: string, // Quiz ID
    @Body('userAnswers') userAnswers: string[], // Array of user answers
    @Body('selectedQuestions') selectedQuestions: string[], // Array of selected questions with questionId
    @Query('userId') userId: string, // User ID passed as query parameter
  ) {
    return await this.quizService.evaluateQuiz(userAnswers, selectedQuestions, userId, quizId);
  }
}