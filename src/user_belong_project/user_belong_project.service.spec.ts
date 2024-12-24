import { Test, TestingModule } from '@nestjs/testing';
import { UserBelongProjectService } from './user_belong_project.service';

describe('UserBelongProjectService', () => {
  let service: UserBelongProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBelongProjectService],
    }).compile();

    service = module.get<UserBelongProjectService>(UserBelongProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
