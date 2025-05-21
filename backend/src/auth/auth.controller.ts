/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */


import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/RegisterRequest.dto.';
import { SignInDto } from './dto/SignIn.dto';
import { Public } from './decorators/public.decorator';
import { UserService } from 'src/user/user.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,private userService:UserService) {}

   @Public()
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res) {
      try {
        console.log('helllo')
        const result = await this.authService.signIn(signInDto.email, signInDto.password);
        console.log("result",result);
        const user=this.userService.findById(result.userId);
        const role=(await user).role;
        res.cookie('token', result.access_token, { // Prevents client-side JavaScript access
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          maxAge: 3600 * 1000, // Cookie expiration time in milliseconds
        });

        res.cookie('userId' , result.userId , {
 // Prevents client-side JavaScript access
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          maxAge: 3600 * 1000, // Cookie expiration time in milliseconds
        }

      );
        res.cookie('role', role, { // Prevents client-side JavaScript access
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          maxAge: 3600 * 1000, // Cookie expiration time in milliseconds
        });
        console.log("cookie",res.cookie);
        // Return success
        return {
          statusCode: HttpStatus.OK,
          message: 'Login successful',
          //user: result.payload,
        };
      } catch (error) {
          console.log(error)
        // Handle specific errors
        if (error instanceof HttpException) {
          throw error; // Pass through known exceptions
        }
  
        // Handle other unexpected errors
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An error occurred during login',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  @Public()
  @Post('register')
  async signup(@Body() registerRequestDto: RegisterRequestDto) {
    try {
      // Call the AuthService to handle registration
      const result = await this.authService.register(registerRequestDto);
      this.signIn;
      // Return a success response with HTTP 201 Created status
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: result,
      };
    } catch (error) {
      // Handle specific errors, such as email already exists or validation errors
      if (error.status === 409) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'User already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      // Catch any other errors and throw a generic internal server error
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  


}