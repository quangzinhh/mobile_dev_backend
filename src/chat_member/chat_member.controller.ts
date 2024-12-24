import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatMemberService } from './chat_member.service';
import { CreateChatMemberDto } from './dto/create-chat_member.dto';
import { UpdateChatMemberDto } from './dto/update-chat_member.dto';

@Controller('chat-members')
export class ChatMemberController {
  constructor(private readonly chatMemberService: ChatMemberService) {}

  @Post()
  create(@Body() createChatMemberDto: CreateChatMemberDto) {
    return this.chatMemberService.create(createChatMemberDto);
  }

  @Get()
  findAll() {
    return this.chatMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatMemberDto: UpdateChatMemberDto) {
    return this.chatMemberService.update(+id, updateChatMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatMemberService.remove(+id);
  }
}
