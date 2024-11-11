import { Module } from '@nestjs/common';
import { UserManageDepartmentService } from './user_manage_department.service';
import { UserManageDepartmentController } from './user_manage_department.controller';
import { UserManageDepartmentRepository } from './user_manage_department.repository';
import { UserRepository } from 'src/user/user.repository';
import { DepartmentRepository } from 'src/department/department.repository';

@Module({
  controllers: [UserManageDepartmentController],
  providers: [UserManageDepartmentService, UserManageDepartmentRepository, UserRepository, DepartmentRepository],
})
export class UserManageDepartmentModule {}
