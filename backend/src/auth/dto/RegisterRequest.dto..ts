/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString, MinLength, IsEnum, IsOptional, IsDate } from "class-validator";

export class RegisterRequestDto {
   
   
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password_hash: string; // This will be hashed in the service layer.

  @IsNotEmpty()
  @IsEnum(['student', 'instructor', 'admin'] )
  role: 'student' | 'instructor' | 'admin';

  @IsOptional()
  @IsString()
  profile_picture_url?: string;

  @IsOptional()
  @IsDate()
  created_at?: Date;


  }