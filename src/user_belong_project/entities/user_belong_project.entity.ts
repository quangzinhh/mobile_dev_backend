import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_belong_project')
export class UserBelongProject {
  @PrimaryGeneratedColumn()
  mId: number;  

  @Column({ name: 'm_user_id' })
  mUserId: number;

  @Column({ name: 'm_project_id' })
  mProjectId: number;

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  
}
