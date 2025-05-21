/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import * as fs from 'fs';
import * as path from 'path';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { authorizationGuard } from 'src/auth/guards/authorization.guards';

@Controller('backup')
export class BackupController {
  private readonly logger = new Logger(BackupController.name);

  constructor(private readonly backupService: BackupService) {}

  // Endpoint to trigger the backup manually
  @Roles(Role.Admin)
  @UseGuards(authorizationGuard)
  @Get('trigger')
  async triggerBackup() {
    this.logger.log('Manual backup triggered.');
    await this.backupService.backupData();
    return { message: 'Backup successfully triggered.' };
  }

  // Endpoint to list all existing backup files
  @Roles(Role.Admin)
  @UseGuards(authorizationGuard)
  @Get('list')
  listBackups() {
    const backupPath = path.join(__dirname, '..', '..', 'backups');
    if (!fs.existsSync(backupPath)) {
      return { message: 'No backups found.' };
    }

    const files = fs.readdirSync(backupPath).map((file) => ({
      filename: file,
      path: path.join(backupPath, file),
    }));

    return { backups: files };
  }
}
