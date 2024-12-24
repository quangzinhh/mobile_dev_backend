import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat_group.service';
import { ChatGroupController } from './chat_group.controller';
import { ChatGroupRepository } from './chat_group.repository';
import { UserRepository } from 'src/user/user.repository';
import { ChatMessageModule } from 'src/chat_message/chat_message.module';

@Module({
  imports: [ChatMessageModule],
  controllers: [ChatGroupController],
  providers: [ChatGroupService, ChatGroupRepository, UserRepository],
  exports: [ChatGroupService]
})
export class ChatGroupModule {}
