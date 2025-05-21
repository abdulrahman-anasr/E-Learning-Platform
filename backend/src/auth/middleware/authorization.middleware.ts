import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../custom-request'; // Path to the interface

const isUserAuthorized = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedException('User does not have the required role');
    }
    next();
  };
};

export default isUserAuthorized;
