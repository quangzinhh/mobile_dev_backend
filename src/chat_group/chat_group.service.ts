import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chat_group.dto';
import { UpdateChatGroupDto } from './dto/update-chat_group.dto';
import { ChatGroupRepository } from './chat_group.repository';
import { UserRepository } from 'src/user/user.repository';
import { ChatMessageService } from 'src/chat_message/chat_message.service';

@Injectable()
export class ChatGroupService {
  constructor(
    private chatMessageService: ChatMessageService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ChatGroupRepository) private chatGroupRepository: ChatGroupRepository
  ) {}

  async create(createChatGroupDto: CreateChatGroupDto) {
    const user = await this.userRepository.findOne({
      where: {
        mId: createChatGroupDto.mOwnerId
      }
    })

    if(!user) {
      throw new BadRequestException(`User ${createChatGroupDto.mOwnerId} is not exists`)
    }

    let newChatgroup = this.chatGroupRepository.create({
      mName: createChatGroupDto.mName,
      mOwnerId: createChatGroupDto.mOwnerId,
      mCreated: new Date().toISOString()
    })

    return await this.chatGroupRepository.save(newChatgroup)
  }

  async findAll() {
    return await this.chatGroupRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} chatGroup`;
  }

  async getMessages(groupId: number) {
    return await this.chatMessageService.findByGroupId(groupId)
  }

  update(id: number, updateChatGroupDto: UpdateChatGroupDto) {
    return `This action updates a #${id} chatGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatGroup`;
  }
}
