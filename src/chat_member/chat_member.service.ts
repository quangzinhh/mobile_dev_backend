import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateChatMemberDto } from './dto/create-chat_member.dto';
import { UpdateChatMemberDto } from './dto/update-chat_member.dto';
import { ChatMemberRepository } from './chat_member.repository';
import { ChatGroupRepository } from 'src/chat_group/chat_group.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ChatMemberService {
  constructor(
    @InjectRepository(ChatMemberRepository) private chatMemberRepository: ChatMemberRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ChatGroupRepository) private chatGroupRepository: ChatGroupRepository
  ) {}
  
  async create(createChatMemberDto: CreateChatMemberDto) {
    
    const user = await this.userRepository.findOne({
      where: {
        mId: createChatMemberDto.mUserId
      }
    })

    if(!user) {
      throw new BadRequestException(`User ${createChatMemberDto.mUserId} is not exist`)
    }

    const chatgroup = await this.chatGroupRepository.findOne({
      where: {
        mId: createChatMemberDto.mChatGroupId
      }
    })

    if(!chatgroup) {
      throw new BadRequestException(`Chatgroup ${createChatMemberDto.mChatGroupId} is not exist`)
    }

    let newChatMember = this.chatMemberRepository.create({
      mUserId: createChatMemberDto.mUserId,
      mChatGroupId: createChatMemberDto.mChatGroupId,
      mCreated: new Date().toISOString()
    })

    return await this.chatMemberRepository.save(newChatMember)
  }

  async findAll() {
    return await this.chatMemberRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} chatMember`;
  }

  update(id: number, updateChatMemberDto: UpdateChatMemberDto) {
    return `This action updates a #${id} chatMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatMember`;
  }
}
