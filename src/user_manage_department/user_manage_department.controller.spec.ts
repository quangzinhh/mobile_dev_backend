import { Test, TestingModule } from '@nestjs/testing';
import { UserManageDepartmentController } from './user_manage_department.controller';
import { UserManageDepartmentService } from './user_manage_department.service';

describe('UserManageDepartmentController', () => {
  let controller: UserManageDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserManageDepartmentController],
      providers: [UserManageDepartmentService],
    }).compile();

    controller = module.get<UserManageDepartmentController>(UserManageDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
