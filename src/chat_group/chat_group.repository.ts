import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChatGroup } from './entities/chat_group.entity';

@Injectable()
export class ChatGroupRepository extends Repository<ChatGroup> {
    constructor(private dataSource: DataSource) {
        super(ChatGroup, dataSource.createEntityManager());
    }
}