import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat_message.service';
import { ChatMessageController } from './chat_message.controller';
import { ChatMessageRepository } from './chat_message_repository';
import { UserRepository } from 'src/user/user.repository';
import { ChatGroupRepository } from 'src/chat_group/chat_group.repository';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageRepository, UserRepository, ChatGroupRepository],
  exports: [ChatMessageService]
})
export class ChatMessageModule {}
