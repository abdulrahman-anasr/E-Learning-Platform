/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Put, Param, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/createRating.dto';
import { UpdateRatingDto } from './dto/updateRating.dto';
import { Rating } from '../models/rating-schema';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

@UseGuards(authorizationGuard)
@Roles(Role.Student)
  @Post('createrating')
  async createRating(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return await this.ratingService.createRating(createRatingDto);
  }

@UseGuards(authorizationGuard)
@Roles(Role.Student)
  @Put(':id')
  async updateRating(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.updateRating(id, updateRatingDto);
  }

@UseGuards(authorizationGuard)
@Roles(Role.Admin)
  @Get()
  async findAll(): Promise<Rating[]> {
    return await this.ratingService.findAll();
  }
  @UseGuards(authorizationGuard)
  @Roles(Role.Admin)

  // @Get()
  // async findAll(): Promise<Rating[]> {
  //   return await this.ratingService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rating> {
    try {
      return await this.ratingService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
}
@Roles(Role.Instructor, Role.Admin, Role.Student)
@UseGuards(authorizationGuard)
  @Get('module-rating/:moduleId')
  async getModuleRatingsByCourse(@Param('moduleId') courseId: string) {
    return await this.ratingService.getModuleRatingsByCourse(courseId);
  }

  @Roles(Role.Instructor, Role.Admin, Role.Student)
  @UseGuards(authorizationGuard)
  @Get('course-rating/:courseId')
  async getCourseRatingFromModules(@Param('courseId') courseId: string) {
    return await this.ratingService.getCourseRatingFromModules(courseId);
  }

  @Roles(Role.Instructor, Role.Admin, Role.Student)
  @UseGuards(authorizationGuard)
  @Get('instructor-rating/:instructorId')
  async getInstructorRating(@Param('instructorId') instructorId: string) {
    return await this.ratingService.getInstructorRating(instructorId);
  }
  
  @Roles(Role.Student)
  @UseGuards(authorizationGuard)
  @Post()
  async rateEntity(@Body() createRatingDto: CreateRatingDto) {

      return await this.ratingService.createRating(createRatingDto);
    
  }
  @Roles(Role.Student)
  @UseGuards(authorizationGuard)
  @Post('rateinstructor')
  async rateInstructor(@Body() createRatingDto: CreateRatingDto) {

      return await this.ratingService.createRating(createRatingDto);

  }

  @Get() 
  async getAllRatings() {
    try {
      return await this.ratingService.getAllRatings();
    } catch (error) {
      throw new NotFoundException('Error retrieving ratings');
    }
  }

 

}
