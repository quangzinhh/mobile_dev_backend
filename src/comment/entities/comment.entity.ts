import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  mId: number;  

  @Column({ name: 'm_task_id' })
  mTaskId: number;

  @Column({ name: 'm_user_id' })
  mUserId: number;

  @Column({ name: 'm_content' })
  mContent: string;

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  
}
