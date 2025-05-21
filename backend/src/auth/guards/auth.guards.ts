/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private readonly loggerService: LoggerService, // Inject LoggerService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        console.log("token", token);
        if (!token) {
            this.loggerService.logFailedLogin('unknown', 'No token provided'); // Log unauthorized access
            throw new UnauthorizedException('No token, please login');
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                },
            );
            console.log("payload", payload);
            request['user'] = payload; // Attach payload to request object

            return true; // Allow access if token is valid
        } catch (error) {
            // Log the failed attempt with email if available in the token payload
            const payload = this.jwtService.decode(token) as { email?: string };
            const email = payload?.email || 'unknown';
            this.loggerService.logFailedLogin(email, 'Invalid or expired token'); // Log failed attempt
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.cookies?.token || request.headers['authorization']?.split(' ')[1];
        console.log('Extracted Token:', token);
        return token;
    }
}
