import { Test, TestingModule } from '@nestjs/testing';
import { ChatMemberController } from './chat_member.controller';
import { ChatMemberService } from './chat_member.service';

describe('ChatMemberController', () => {
  let controller: ChatMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatMemberController],
      providers: [ChatMemberService],
    }).compile();

    controller = module.get<ChatMemberController>(ChatMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
