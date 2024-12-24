import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  mId: number;  

  @Column({ name: 'm_name' })
  mName: string;  

  @Column({ name: 'm_description', unique: true })
  mDescription: string;  

  @Column({ name: 'm_owner_id' })
  mOwnerId: number;

  @Column({ name: 'm_start_date', type: 'varchar', length: 32 })
  mStartDate: string; 

  @Column({ name: 'm_end_date', type: 'varchar', length: 32 })
  mEndDate: string;   

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  

  @Column({ name: 'm_modified', type: 'varchar', length: 32 })
  mModified: string;
}
