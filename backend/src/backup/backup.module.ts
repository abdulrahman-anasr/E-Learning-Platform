/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { UserModule } from '../user/user.module'; // Import the UserModule for dependency injection
import { LoggerService } from 'src/auth/logger.service';

@Module({
  imports: [UserModule], // Ensure UserModule is imported so UserService can be injected
  controllers: [BackupController],
  providers: [BackupService,LoggerService],
  exports: [BackupService], // Export BackupService if other modules need it
})
export class BackupModule {}
