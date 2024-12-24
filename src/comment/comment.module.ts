import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { UserRepository } from 'src/user/user.repository';
import { TaskRepository } from 'src/task/task.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, UserRepository, TaskRepository],
  exports: [CommentService]
})
export class CommentModule {}
