import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatMessageService } from './chat_message.service';
import { CreateChatMessageDto } from './dto/create-chat_message.dto';
import { UpdateChatMessageDto } from './dto/update-chat_message.dto';

@Controller('chat-messages')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Post()
  create(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessageService.create(createChatMessageDto);
  }

  @Get()
  findAll() {
    return this.chatMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatMessageService.update(+id, updateChatMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatMessageService.remove(+id);
  }
}
