/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as cron from 'node-cron';
import { UserService } from '../user/user.service'; // Import your user service

@Injectable()
export class BackupService {
    private readonly logger = new Logger(BackupService.name);

    constructor(
        private readonly userService: UserService,
    ) {}

    // Schedule backup process
    scheduleBackup() {
        cron.schedule('0 0 * * *', async () => { // Runs daily at midnight
            this.logger.log('Starting daily backup process...');
            await this.backupData();
        });
        this.logger.log('Backup job scheduled.');
    }

    // Backup logic
    async backupData() {
        try {
            // Fetch user data
            const users = await this.userService.findAll();
            // const courses = await this.courseService.findAll(); Will be changed when merging with any Enroll Functionality ( Get courses that this user has )
            
            console.log()

            const backup = {
                timestamp: new Date(),
                users,
                //courses,
            };

            // Save backup as a JSON file
            const backupPath = path.join(__dirname, '..', '..', 'backups');
            if (!fs.existsSync(backupPath)) {
                fs.mkdirSync(backupPath);
            }

            const filePath = path.join(backupPath, `backup-${Date.now()}.json`);
            fs.writeFileSync(filePath, JSON.stringify(backup, null, 2));

            this.logger.log(`Backup saved at ${filePath}`);
        } catch (error) {
            this.logger.error('Error during backup process', error.stack);
        }
    }
}
