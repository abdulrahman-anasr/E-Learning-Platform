/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UserNotification } from '../models/notification-schema';  // Ensure this points to the correct file
import { authorizationGuard } from 'src/auth/guards/authorization.guards';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { CreateNotificationDto } from './dto/createNotification.dto';


@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationService) {}

  @Roles(Role.Admin)
  @UseGuards(authorizationGuard)
  @Post('create-for-all')
  async createNotificationForAll(
    @Body() body: { message: string}
  ) {
    const { message} = body;

    if (!message) {
      throw new BadRequestException('Message is required');
    }

    try {
      const notifications = await this.notificationService.createNotificationForAllUsers(
        message
      );
      return { success: true, notifications };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  
  }

  
  @UseGuards(AuthGuard)
  @Roles(Role.Student, Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get()
  async getUserNotifications(@Req () req): Promise<UserNotification[]> {
    const userId = req.cookies.userId;
    console.log("User ID in get user notifications is: " + userId);
    return this.notificationService.getUserNotifications(userId);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Student, Role.Instructor)
  @UseGuards(authorizationGuard)
  @Get('getNotification/:notificationId')
  async getNotification(@Req () req , @Param('notificationId') notificationId: string) {
    const userId = req.cookies.userId;
    return this.notificationService.getNotification(userId , notificationId);
  }
   
  
  @Roles(Role.Student, Role.Instructor)
  @UseGuards(authorizationGuard)
  @UseGuards(AuthGuard)
  @Patch('read/:notificationId')
  async markAsRead(@Param('notificationId') notificationId: string) {
    console.log("Called read function");
    return this.notificationService.markAsRead(notificationId);
  }
  @Roles(Role.Student, Role.Instructor)
  @UseGuards(authorizationGuard)
  @UseGuards(AuthGuard)
  @Get(':userId/unread')
  async getUnreadNotifications(@Req () req): Promise<UserNotification[]> {
    const userId = req.cookies.userId;
    return this.notificationService.getUnreadNotifications(userId);
  }


}
