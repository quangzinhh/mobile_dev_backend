import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatGroupService } from './chat_group.service';
import { CreateChatGroupDto } from './dto/create-chat_group.dto';
import { UpdateChatGroupDto } from './dto/update-chat_group.dto';

@Controller('chat-groups')
export class ChatGroupController {
  constructor(private readonly chatGroupService: ChatGroupService) {}

  @Post()
  create(@Body() createChatGroupDto: CreateChatGroupDto) {
    return this.chatGroupService.create(createChatGroupDto);
  }

  @Get()
  findAll() {
    return this.chatGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatGroupDto: UpdateChatGroupDto) {
    return this.chatGroupService.update(+id, updateChatGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatGroupService.remove(+id);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.chatGroupService.getMessages(+id);
  }
}
