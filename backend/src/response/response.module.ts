/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseSchema } from '../models/responses-schema';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/auth/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Responses', schema: ResponseSchema }]),  
  ],
  controllers: [ResponseController],  
  providers: [ResponseService,JwtService,LoggerService],  
  exports:[ResponseService]
})
export class ResponseModule {}
