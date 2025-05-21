/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';


import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { LoggerService } from './logger.service';

@Module({
  imports: [
     // Resolve circular dependencies
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),  // Ensure JWT_SECRET is defined in .env or config
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES') || '1h',  // Default expiration
        },
      }),
    }),forwardRef(() => UserModule),
  ],
  controllers:[AuthController],
 // Export necessary services for other modules
  providers: [AuthService,LoggerService],
  exports: [AuthService,JwtModule,LoggerService], // Export necessary services for other modules
})
export class AuthModule {}
