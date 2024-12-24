import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChatMember } from './entities/chat_member.entity';

@Injectable()
export class ChatMemberRepository extends Repository<ChatMember> {
    constructor(private dataSource: DataSource) {
        super(ChatMember, dataSource.createEntityManager());
    }
}