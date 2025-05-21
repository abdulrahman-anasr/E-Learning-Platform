/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ConflictException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User , UserDocument } from '../models/user-schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, RefreshTokenDocument} from'../models/refreshToken-schema';
import { LoginDto } from '../user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { RegisterRequestDto } from './dto/RegisterRequest.dto.';
import { LoggerService } from './logger.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private readonly loggerService: LoggerService
    ) { }
    async register(user: RegisterRequestDto): Promise<string> {
        const existingUser = await this.usersService.findByEmail(user.email);
        if (existingUser) {
          throw new ConflictException('email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password_hash, 10);
        const newUser: User = {
          ...user,
          password_hash: hashedPassword,
          created_at: new Date(), // Ensure `created_at` is set as required by User type
      };
        await this.usersService.create(newUser);
        return 'registered successfully';
      }

      async signIn(email: string,password: string): Promise< {access_token:string , userId : string}> {
        console.log("Email is: " + email + " and password is: " + password);
        const user: UserDocument = await this.usersService.findByEmail(email); // Use UserDocument type
        if (!user) {
          throw new NotFoundException('User not found');
        }
        
        console.log('password: ', user.password_hash);
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
          this.loggerService.logFailedLogin(email, 'Invalid credentials');
          throw new UnauthorizedException('Invalid credentials');
          
  
        }
      
        const payload = { userid: user._id, role: user.role }; // _id is accessible from UserDocument
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return { access_token: token , userId : user._id.toString() };
        
  }}