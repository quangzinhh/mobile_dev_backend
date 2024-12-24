import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/create-chat_message.dto';
import { UpdateChatMessageDto } from './dto/update-chat_message.dto';
import { ChatMessageRepository } from './chat_message_repository';
import { UserRepository } from 'src/user/user.repository';
import { ChatGroupRepository } from 'src/chat_group/chat_group.repository';

@Injectable()
export class ChatMessageService {
  constructor(
      @InjectRepository(ChatMessageRepository) private chatMessageRepository: ChatMessageRepository,
      @InjectRepository(UserRepository) private userRepository: UserRepository,
      @InjectRepository(ChatGroupRepository) private chatGroupRepository: ChatGroupRepository
    ) {}

  async create(createChatMessageDto: CreateChatMessageDto) {
    const user = await this.userRepository.findOne({
      where: {
        mId: createChatMessageDto.mUserId
      }
    })

    if(!user) {
      throw new BadRequestException(`User ${createChatMessageDto.mUserId} is not exist`)
    }

    const chatgroup = await this.chatGroupRepository.findOne({
      where: {
        mId: createChatMessageDto.mChatGroupId
      }
    })

    if(!chatgroup) {
      throw new BadRequestException(`Chatgroup ${createChatMessageDto.mChatGroupId} is not exist`)
    }

    let newChatMessage = this.chatMessageRepository.create({
      mUserId: createChatMessageDto.mUserId,
      mChatGroupId: createChatMessageDto.mChatGroupId,
      mMessage: createChatMessageDto.mMessage,
      mCreated: new Date().toISOString()
    })

    return await this.chatMessageRepository.save(newChatMessage)
  }

  findAll() {
    return `This action returns all chatMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatMessage`;
  }

  async findByGroupId(groupId: number) {
    return await this.chatMessageRepository.find({
      where: {
        mChatGroupId: groupId
      }
    })
  }

  update(id: number, updateChatMessageDto: UpdateChatMessageDto) {
    return `This action updates a #${id} chatMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatMessage`;
  }
}
