/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Body, Controller, Get, Param, Post, Put, Req, Delete, UseGuards } from '@nestjs/common';
import { ModuleService } from './module.service'; 
import { CreateModuleDto } from './DTO/createModule.dto';
import { UpdateModuleDto } from './DTO/updateModule.dto';
import { UseInterceptors , Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StreamableFile } from '@nestjs/common';

import { UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Course } from '../models/course-schema';

var currentFileName = ""

@Controller('modules')
export class ModuleController {
    constructor(private readonly moduleService: ModuleService,@InjectModel(Course.name) private courseModel: Model<Course>) {} 
    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Post('create')
    async createModule(@Req() req,@Body() createModuleDto: CreateModuleDto)
    {
   
        return this.moduleService.createModule(req,createModuleDto);

    }
    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Put(':id')
    async updateModule(@Param('id') id: string, @Req() req,@Body() updateModuleDto: UpdateModuleDto) {
        return this.moduleService.updateModule(id, req,updateModuleDto);
    }

    @Get('get/:id')
    async getModule(@Param('id') id: string)
    {
        return this.moduleService.getModule(id);
    }

    @Get('performancelevel/:id')
    async getPerformanceLevel(@Param('id') id: string , @Req() req)
    {
      const userid=req.cookies.userId;
      return this.moduleService.checkModuleCompatibility(id , userid);
    }

    @Delete('delete/:id')
    async deleteModule(@Param('id') id: string)
    {
        return this.moduleService.deleteModule(id);
    }

    @Get('getmodules/:id')
    async getAllModules(@Param('id') id: string)
    {
        return this.moduleService.findAllCourseModules(id);
    }

    @Delete('deletecontent/:id/:name')
    async deleteFile(@Param('id') id: string , @Param('name') name: string)
    {
        return this.moduleService.deleteFile(id , name);
    }

    @Post('moduleLevel')
    async checkModuleCompatibility(@Param('id') id: string)
    {
        return this.moduleService.checkModuleCompatibility(id , 'Above Average');
        //placeholder value , CHANGE ASAP!!
    }
    @UseGuards(AuthGuard)
    @Roles(Role.Instructor,Role.Student)
    @UseGuards(authorizationGuard)
    @Get('coursemodules/:id')
    async getAllCourseModules(@Req() req,@Param('id') course_id : string)
    {
      const userid=req.cookies.userId;
      const course=this.courseModel.findById(course_id);
      let enrolled=false;
      (await course).students.forEach(student => {
          if(student._id.toString()===userid){
            enrolled=true;
          }
      })
      if(!enrolled){
        throw new Error("You are not enrolled in this course");
      }

      return this.moduleService.findAllCourseModules(course_id);
    }

    @Roles(Role.Instructor)
    @UseGuards(authorizationGuard)
    @Post('upload/:id')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
              const name = file.originalname;
              const fileNameNoExtension = name.split(".")[0];
              const ext = extname(file.originalname);
              const filename = `${fileNameNoExtension}.${uniqueSuffix}${ext}`;
              currentFileName = filename;
              callback(null, filename);
            },
          }),
        }),
      )
    async uploadFile(@Req() req , @UploadedFile() file: Express.Multer.File , @Param('id') moduleId: string)
    {
      const fileName = currentFileName;
      console.log("Test -- filename is: " + fileName);
      return this.moduleService.uploadFile(req , file , moduleId , fileName);
    }

    @Roles(Role.Instructor , Role.Student)
    @UseGuards(authorizationGuard)
    @Get('download/:id/:file')
    getFile(@Param('id') module_id : string , @Param('file') file : string): StreamableFile {
      
      return this.moduleService.getFile(file);
}


}
