import { Module, forwardRef } from '@nestjs/common';
import { UserBelongProjectService } from './user_belong_project.service';
import { UserBelongProjectController } from './user_belong_project.controller';
import { UserBelongProjectRepository } from './user_belong_project.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProjectRepository } from 'src/project/project.repository';

@Module({
  controllers: [UserBelongProjectController],
  providers: [UserBelongProjectService, UserBelongProjectRepository, UserRepository, ProjectRepository],
  exports: [UserBelongProjectService]
})
export class UserBelongProjectModule {}
