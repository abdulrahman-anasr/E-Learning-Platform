import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
     email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    password: string;
  }