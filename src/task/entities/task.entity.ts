import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  mId: number;  

  @Column({ name: 'm_name' })
  mName: string;  

  @Column({ name: 'm_description' })
  mDescription: string; 
  
  @Column({ name: 'm_status' })
  mStatus: string;

  @Column({ name: 'm_project_id' })
  mProjectId: number;

  @Column({ name: 'm_reported_id' })
  mReporterId: number;

  @Column({ name: 'm_assignee_id' })
  mAssigneeId: number;

  @Column({ name: 'm_start_date', type: 'varchar', length: 32 })
  mStartDate: string; 

  @Column({ name: 'm_end_date', type: 'varchar', length: 32 })
  mEndDate: string;   

  @Column({ name: 'm_created', type: 'varchar', length: 32 })
  mCreated: string;  

  @Column({ name: 'm_modified', type: 'varchar', length: 32 })
  mModified: string;
}
