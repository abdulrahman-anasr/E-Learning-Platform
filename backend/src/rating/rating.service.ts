/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from '../models/rating-schema';
import mongoose from 'mongoose';
import { CreateRatingDto } from './dto/createRating.dto';
import { UpdateRatingDto } from './dto/updateRating.dto';
import { Module } from '../models/module-schema';


@Injectable()
export class RatingService {
    userModel: any;
    courseModel: any;
    constructor(
        @InjectModel('Rating') private readonly ratingModel: Model<RatingDocument>,
        @InjectModel('Mod') private readonly moduleModel: Model<Module>,
    ) { }

        async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
        const newRating = new this.ratingModel(createRatingDto);
        return await newRating.save();
    }

    async rateInstructor(ratedEntityType: 'Instructor', ratedInstructorId: string, rating: number, userId: string) {
        const createRatingDto = {
          rating,
          ratedEntity: ratedEntityType,  
          ratedEntityId: ratedInstructorId,  
          user_id: userId,
        };
      
        return await this.createRating(createRatingDto);
      }
      
    async updateRating(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating> {
        return await this.ratingModel.findByIdAndUpdate(id, updateRatingDto, { new: true });
    }

     async findAll(): Promise<Rating[]> {
         return this.ratingModel.find().exec();
    }

    async findOne(id: string): Promise<Rating> {
        const rating = await this.ratingModel.findOne({ _id: id }).exec();
        if (!rating) {
            throw new NotFoundException(`Rating record with ID ${id} not found`);
        }
        return rating;
    }

    async getModuleRatingsByCourse(courseId: string): Promise<{ moduleId: string; averageRating: number | string }[]> {
        const modules = await this.moduleModel.find({ course_id: courseId }).select('_id').exec();
        const moduleRatings = [];

        for (const module of modules) {
            const ratings = await this.ratingModel.aggregate([
                { $match: { ratedEntity: 'Module', ratedEntityId: new mongoose.Types.ObjectId(module._id) } },
                { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } },
            ]);

            moduleRatings.push({
                moduleId: module._id.toString(),
                averageRating: ratings.length > 0 ? ratings[0].averageRating : "No ratings yet", 
            });
        }

        return moduleRatings;
    }

    async getCourseRatingFromModules(courseId: string): Promise<number | string> {
        const moduleRatings = await this.getModuleRatingsByCourse(courseId);

      // exclude string
        const totalRating = moduleRatings.reduce((sum, module) => {
            if (typeof module.averageRating === "number") {
                sum += module.averageRating; // Only sum numbers
            }
            return sum;
        }, 0);

        const validRatingsCount = moduleRatings.filter(module => typeof module.averageRating === "number").length;
        const averageCourseRating = validRatingsCount > 0 ? totalRating / validRatingsCount : "No ratings yet";

        return averageCourseRating;
    }

    async getInstructorRating(instructorId: string): Promise<number | string> {
        const ratings = await this.ratingModel.aggregate([
            { $match: { ratedEntity: 'Instructor', ratedEntityId: new mongoose.Types.ObjectId(instructorId) } },
            { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } },
        ]);

        return ratings.length > 0 ? ratings[0].averageRating : "No ratings yet"; 
    }

    private async getAllModuleRatings(): Promise<any[]> {
        try {
            const moduleRatings = await this.ratingModel.aggregate([
                { $match: { ratedEntity: 'Module' } }, // Filter for modules
                { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } }, // Group by module ID and average rating
            ]);
            return moduleRatings;
        } catch (err) {
            console.error('Error fetching module ratings:', err);
            throw new NotFoundException('Error fetching module ratings');
        }
    }
    
    // Method to fetch ratings for all instructors
    private async getAllInstructorRatings(): Promise<any[]> {
        try {
            const instructorRatings = await this.ratingModel.aggregate([
                { $match: { ratedEntity: 'Instructor' } }, // Filter for instructors
                { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } }, // Group by instructor ID and average rating
            ]);
            return instructorRatings;
        } catch (err) {
            console.error('Error fetching instructor ratings:', err);
            throw new NotFoundException('Error fetching instructor ratings');
        }
    }
  
    

    async getAllRatings(): Promise<any> {
        try {
    
            const moduleRatings = await this.getAllModuleRatings();
        
            const instructorRatings = await this.getAllInstructorRatings();
         
    
            return {
                moduleRatings,
                instructorRatings,
            };
        } catch (err) {
            console.error('Error retrieving ratings:', err);
            throw new NotFoundException('Error retrieving ratings');
        }
    }


    }