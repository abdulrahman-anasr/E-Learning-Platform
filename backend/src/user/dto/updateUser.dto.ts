/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsOptional } from 'class-validator';

export default class updateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  profile_picture_url?: string;
}
