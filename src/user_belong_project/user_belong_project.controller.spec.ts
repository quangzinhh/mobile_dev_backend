import { Test, TestingModule } from '@nestjs/testing';
import { UserBelongProjectController } from './user_belong_project.controller';
import { UserBelongProjectService } from './user_belong_project.service';

describe('UserBelongProjectController', () => {
  let controller: UserBelongProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBelongProjectController],
      providers: [UserBelongProjectService],
    }).compile();

    controller = module.get<UserBelongProjectController>(UserBelongProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
