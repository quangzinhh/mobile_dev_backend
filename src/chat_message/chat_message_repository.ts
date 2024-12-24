import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChatMessage } from './entities/chat_message.entity';

@Injectable()
export class ChatMessageRepository extends Repository<ChatMessage> {
    constructor(private dataSource: DataSource) {
        super(ChatMessage, dataSource.createEntityManager());
    }
}