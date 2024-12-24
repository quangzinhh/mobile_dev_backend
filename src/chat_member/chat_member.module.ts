import { Module } from '@nestjs/common';
import { ChatMemberService } from './chat_member.service';
import { ChatMemberController } from './chat_member.controller';
import { ChatMemberRepository } from './chat_member.repository';
import { UserRepository } from 'src/user/user.repository';
import { ChatGroupRepository } from 'src/chat_group/chat_group.repository';

@Module({
  controllers: [ChatMemberController],
  providers: [ChatMemberService, ChatMemberRepository, UserRepository, ChatGroupRepository],
})
export class ChatMemberModule {}
