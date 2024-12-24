import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProjectRepository } from 'src/project/project.repository';
import { CommentModule } from 'src/comment/comment.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [CommentModule, NotificationModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, UserRepository, ProjectRepository],
  exports: [TaskService]
})
export class TaskModule {}
