/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Responses, ResponsesDocument } from '../models/responses-schema';
import { CreateResponseDto } from './dto/createResponse.dto';
import { UpdateResponseDto } from './dto/updateResponse.dto';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Responses.name) private responseModel: Model<Responses>,
  ) { }

  async create(createResponseDto: CreateResponseDto): Promise<Responses> {
    const newResponse = new this.responseModel(createResponseDto);
    return newResponse.save();
  }

  async findAll(): Promise<Responses[]> {
    return this.responseModel.find().exec();
  }

  async findOne(id: string): Promise<Responses> {
    const response = await this.responseModel.findOne({ _id: id }).exec();
    if (!response) {
      throw new NotFoundException(`Response record with ID ${id} not found`);
    }
    return response;
  }

  async update(id: string, updateResponseDto: UpdateResponseDto): Promise<Responses> {
    const updatedResponse = await this.responseModel
      .findByIdAndUpdate(id, updateResponseDto, { new: true }).exec();
    if (!updatedResponse) {
      throw new NotFoundException(`Response record with ID ${id} not found`);
    }

    return updatedResponse;
  }

  async delete(id: string): Promise<void> {
    const result = await this.responseModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Response record with ID ${id} not found`);
    }
  }

}
