/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const { DATABASE, PORT = 3001 } = process.env;

  if (!DATABASE) {
    console.error('Error: DATABASE URL is missing in environment variables.');
    process.exit(1); // Exit the process if DATABASE is not defined
  }

  console.log("Connecting to Database URL:", DATABASE);

  // Connect to MongoDB
  try {
    await mongoose.connect(DATABASE);
    console.log('MongoDB connection successful.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if database connection fails
  }

  // Create the app
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Set your frontend's origin
    credentials: true,              // Allow credentials like cookies
  });

  // Middleware
  app.use(cookieParser());

  // Start the server
  await app.listen(3001);
  console.log(`Server is running on http://localhost:${PORT}`);
}

bootstrap();
