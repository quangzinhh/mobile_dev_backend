import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';
import { NotificationModule } from 'src/notification/notification.module';
import { UserBelongProjectModule } from 'src/user_belong_project/user_belong_project.module';

@Module({
  imports: [UserModule, UserBelongProjectModule, TaskModule, NotificationModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService]
})
export class ProjectModule {}
