import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat_group')
export class ChatGroup {
  @PrimaryGeneratedColumn()
  mId: number;  

  @Column({ name: 'm_name' })
  mName: string;
  
  @Column({ name: 'm_owner_id' })
  mOwnerId: number;

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  
}
