import { Injectable ,UnauthorizedException,BadRequestException, HttpStatus, HttpException, Req} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import{ Module} from '../models/module-schema';
import mongoose, { Model, Types } from 'mongoose';
import { CourseDocument } from '../models/course-schema';
import { ProgressDocument } from '../models/progress-schema';
import { QuestionBank } from '../models/questionbank-schema';
import { QuizDocument, Quiz } from '../models/quizzes-schema';
import { ResponsesDocument } from '../models/responses-schema';
import { User } from '../models/user-schema';

import { NotificationService } from 'src/notification/notification.service';
import { ProgressService } from 'src/progress/progress.service';
import { CreateQuizDto } from './DTO/quiz.create.dto';
import { DifficultyLevel, QuestionType } from './DTO/quiz.question.dto';
import { UpdateQuizDto } from './DTO/quiz.update.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<QuizDocument>,
    @InjectModel('Mod') private readonly moduleModel: Model<Module>,
    @InjectModel('QuestionBank') private readonly questionBankModel: Model<QuestionBank>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Progress') private readonly progressModel: Model<ProgressDocument>,
    @InjectModel('Responses') private readonly responsesModel: Model<ResponsesDocument>,
    @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,

    private readonly progressService: ProgressService,
    private readonly notificationService: NotificationService

  ) {}

  async findAll(): Promise<Quiz[]> {
    return await this.quizModel.find();
  }

  async getQuizzesOfModule(id: string): Promise<Quiz[]> {
    return await this.quizModel.find({ module_id: id });
  }

  async findById(id: string): Promise<Quiz> {
    const inpStr: string= id;
    const objectId = new mongoose.Types.ObjectId(inpStr);  
    return await this.quizModel.findById(objectId).exec();
}

async getQuizById(id : string) {
  const quiz = await this.quizModel.findById(new Types.ObjectId(id)).exec();
  return quiz;
}

async createQuiz(createQuizDto: CreateQuizDto) {  
  const quiz = await this.quizModel.create(createQuizDto);
  return await quiz.save();
}

async delete(id: string): Promise<Quiz> {
  const objectId = new mongoose.Types.ObjectId(id); 
  console.log('Quiz ID to delete:', objectId);

  // Check if there are responses for this quiz (should happen before any deletion logic)
  const responsesExist = await this.responsesModel.findOne({ quiz_id: objectId });
  
  if (responsesExist) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  //await this.responsesModel.deleteMany({ quiz_id: objectId });
  const deletedQuiz = await this.quizModel.findByIdAndDelete(objectId);
  if (!deletedQuiz) {
    throw new BadRequestException('Quiz not found.');
  }

  return deletedQuiz;
}



// DONT TOUCH THIS VODOO ( IT WORKS AND IDK HOW )
async generateQuiz(quizId : string, userId: string): Promise<any> {

  const studentQuiz = await this.quizModel.findOne({ _id: quizId });
  const module_id = studentQuiz.module_id;
  const questionType = studentQuiz.questionType;
  const numberOfQuestions = studentQuiz.numberOfQuestions;

  const allQuestions = await this.questionBankModel.find();
  //console.log('All Questions from Question Bank:', allQuestions);

  
  const performanceMetric = await this.progressService.classifyUserPerformance(userId)


  let difficultyLevels: string[];
  if (performanceMetric === 'Above Average') {
    difficultyLevels = [DifficultyLevel.Medium, DifficultyLevel.Hard];
  } else if (performanceMetric === 'Average') {
    difficultyLevels = [DifficultyLevel.Easy, DifficultyLevel.Medium];
  } else if(performanceMetric === 'Below Average'){
    difficultyLevels = [DifficultyLevel.Easy];
  } else {
    difficultyLevels = [DifficultyLevel.Hard]
   }

  console.log('Input Filter Conditions:', {
    module_id,
    difficultyLevels,
    questionType,
  });

  const questionFilter: any = {
    module_id: module_id,
    difficulty_level: { $in: difficultyLevels },
  };

  console.log('Question Type from DTO:', questionType);
  if (questionType === QuestionType.MCQ) {
    questionFilter.question_type = 'MCQ';
  } else if (questionType === QuestionType.TrueFalse) {
    questionFilter.question_type = 'True/False';
  } else {
    questionFilter.question_type = { $in: ['MCQ', 'True/False'] };
  }

  const questions = allQuestions.filter((q) => {
    console.log('Filtering question:', q);
    console.log('Question type from DB:', q.question_type);
    console.log('Question Filter Type:', questionFilter.question_type);

    
    const matchesType = 
    (questionFilter.question_type?.$in?.includes(q.question_type)) || 
    questionFilter.question_type === q.question_type;

  
    console.log('Matches type:', matchesType);
  

    const matchesDifficulty = difficultyLevels.includes(q.difficulty_level);
    console.log('Matches difficulty:', matchesDifficulty);

    const isModuleMatch = q.module_id.toString() === module_id.toString();
    console.log('Module ID matches:', isModuleMatch);
  
    return (
      isModuleMatch &&
      matchesDifficulty &&
      matchesType
    );
  });

  console.log('Filtered Questions:', questions);


  if (questions.length === 0) {
    console.log('No questions matched the filter conditions.');
  }


  const selectedQuestions = this.getRandomQuestions(questions, numberOfQuestions);
  console.log('Selected Questions:', selectedQuestions);

  const transformedQuestions = selectedQuestions.map((q) => ({
    questionId: q._id.toString(),
    question: q.question,
    options: q.options,
    correct_answer: q.correct_answer,
    difficultyLevel: q.difficulty_level,
  }));
  console.log("trans questions",transformedQuestions)
  const extractedQuestionIds : Types.ObjectId[]  = [];
  transformedQuestions.forEach(function(value) {
    extractedQuestionIds.push(new Types.ObjectId(value.questionId))
  })
  console.log("Extracted: " + extractedQuestionIds);
  const quiz = {
    module_id: module_id,
    question_ids: extractedQuestionIds,
    questions: transformedQuestions,
    created_at: new Date(),
    userId: new mongoose.Types.ObjectId(userId),
    numberOfQuestions: numberOfQuestions, // Include this
    questionType: questionType, // Include this
  };
  console.log("Quiz Object Before Save:", quiz);

  return quiz;
}

private shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}


  private getRandomQuestions(questions: any[], count: number): any[] {
    console.log("Number of Questions Selected:", count);
    console.log("Total Available Questions:", questions.length);

    const validCount = Math.min(count, questions.length);
    console.log("Valid Count for Selection:", validCount);
    
    return this.shuffleArray(questions).slice(0, validCount);    

  }


  private calculateScore(
    answers: { questionId: mongoose.Types.ObjectId; answer: string }[],
    selectedQuestions: { questionId: string; correctAnswer: string }[],
  ): number {
    let correctAnswersCount = 0;
  
    // Compare user answers with the correct answers
    answers.forEach((answerObj) => {
      const matchedQuestion = selectedQuestions.find(
        (q) => q.questionId === answerObj.questionId.toString(),
      );
  
      if (matchedQuestion && matchedQuestion.correctAnswer === answerObj.answer) {
        correctAnswersCount++;
      }
    });
  
    // Calculate score as a percentage
    const score = (correctAnswersCount / selectedQuestions.length) * 100;
  
    return score;
  }
  

  async evaluateQuiz(
    userAnswers: string[],
    selectedQuestions: string[],
    userId: string,
    quizId: string
  ): Promise<any> {
    const questions = await this.questionBankModel.find();
    console.log('All questions:', questions);
    console.log('Selected Questions:', selectedQuestions);
  
    const quiz = await this.quizModel.findById(new mongoose.Types.ObjectId(quizId));
    if (!quiz || !quiz.module_id) {
      throw new BadRequestException('Quiz or associated module_id not found.');
    }
    console.log('Quiz Data:', quiz);
  
    const module = await this.moduleModel.findById(quiz.module_id);
    if (!module) {
      throw new BadRequestException('Associated module not found.');
    }
  
    const course = await this.courseModel.findById(module.course_id);
    if (!course) {
      throw new BadRequestException('Associated course not found.');
    }
  
    const modules = await this.moduleModel.find({ course_id: course._id });
    const moduleSize = modules.length;
  
    const quizQuestions = selectedQuestions.map((question) => {
      console.log("Question ID is: " + question);
      const questionObj = questions.find((q) => q._id.toString() === question);
      if (!questionObj) {
        throw new BadRequestException(`Question with ID ${question} not found.`);
      }
      return questionObj;
    });
  
    const answers = quizQuestions.map((question, index) => {
      const correctAnswer = question.correct_answer;
      const explanation = question.explanation;
  
      const userAnswer = userAnswers[index]?.trim().toLowerCase();
      const correctAnswerTrimmed = correctAnswer?.trim().toLowerCase();
  
      return {
        questionId: question._id,
        answer: userAnswer || '',
        correctAnswer: correctAnswer || 'Not available',
        explanation: explanation || 'No explanation available',
        isCorrect: userAnswer === correctAnswerTrimmed,
      };
    });
  
    const correctAnswersCount = answers.filter((a) => a.isCorrect).length;
    const score = (correctAnswersCount / selectedQuestions.length) * 100;
  
    const responseDocument = new this.responsesModel({
      user_id: new mongoose.Types.ObjectId(userId),
      quiz_id: new mongoose.Types.ObjectId(quizId),
      answers,
      correctAnswers: answers.filter((a) => a.isCorrect),
      incorrectAnswers: answers.filter((a) => !a.isCorrect),
      score,
      submittedAt: new Date(),
    });
  
    await responseDocument.save();
  
    return {
      score,
      feedback:
        score >= 50
          ? 'Good job!, you are ready for the next module!'
          : 'Needs improvement, please re-study the module again',
      correctAnswers: answers.filter((a) => a.isCorrect),
      incorrectAnswers: answers.filter((a) => !a.isCorrect),
    };
  }
  
  async update(quizId: string, updateData: UpdateQuizDto): Promise<Quiz> {
    // Check if the quiz exists
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new BadRequestException('Quiz not found.');
    }
  
    // Check if there are responses for this quiz (should happen before any update logic)
    const responsesExist = await this.responsesModel.findOne({ quiz_id: quizId });
    if (responsesExist) {
      throw new UnauthorizedException('This quiz has already been taken by a student and cannot be edited.');
    }
  
    // Proceed with the update only if no responses exist
    quiz.questionType = updateData.questionType || quiz.questionType;
    quiz.numberOfQuestions = updateData.numberOfQuestions || quiz.numberOfQuestions;
  
    // Validate required fields
    if (!quiz.questionType || !quiz.numberOfQuestions) {
      throw new BadRequestException('numberOfQuestions and questionType are required fields.');
    }
    // Save the updated quiz
    await quiz.save();
    return quiz;
  }
async getresponsestotal(id: string): Promise<any> {
  const objectId = new mongoose.Types.ObjectId(id);
  const responses = await this.responsesModel.find({ quiz_id: objectId });
  return responses.length;
}
}