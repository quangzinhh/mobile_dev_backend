import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat_member')
export class ChatMember {
  @PrimaryGeneratedColumn()
  mId: number;  
  
  @Column({ name: 'm_chat_group_id' })
  mChatGroupId: number;

  @Column({ name: 'm_user_id' })
  mUserId: number;

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  
}
