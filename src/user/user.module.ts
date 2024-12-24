import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserBelongProjectModule } from 'src/user_belong_project/user_belong_project.module';
import { NotificationModule } from 'src/notification/notification.module';
import { ProjectRepository } from 'src/project/project.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserBelongProjectModule,
    NotificationModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ProjectRepository],
  exports: [UserService],
})
export class UserModule {}