/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { Forum, ForumSchema } from '../models/forum-schema';
import { Thread, ThreadSchema } from '../models/thread-schema';
import { Reply, ReplySchema } from '../models/reply-schema';
import { User, UserSchema } from 'src/models/user-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Forum.name, schema: ForumSchema },
      { name: Thread.name, schema: ThreadSchema },
      { name: Reply.name, schema: ReplySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ForumService],
  controllers: [ForumController],
  exports:[ForumService]
})
export class ForumModule {}
