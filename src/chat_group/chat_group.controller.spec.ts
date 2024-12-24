import { Test, TestingModule } from '@nestjs/testing';
import { ChatGroupController } from './chat_group.controller';
import { ChatGroupService } from './chat_group.service';

describe('ChatGroupController', () => {
  let controller: ChatGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGroupController],
      providers: [ChatGroupService],
    }).compile();

    controller = module.get<ChatGroupController>(ChatGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
