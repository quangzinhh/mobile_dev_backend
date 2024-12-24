import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  mId: number;  

  @Column({ name: 'm_user_id' })
  mUserId: number;

  @Column({ name: 'm_title' })
  mTitle: string;

  @Column({ name: 'm_content' })
  mContent: string;

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  
}
