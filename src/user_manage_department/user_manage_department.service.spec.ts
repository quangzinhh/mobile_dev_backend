import { Test, TestingModule } from '@nestjs/testing';
import { UserManageDepartmentService } from './user_manage_department.service';

describe('UserManageDepartmentService', () => {
  let service: UserManageDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserManageDepartmentService],
    }).compile();

    service = module.get<UserManageDepartmentService>(UserManageDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
