import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_manage_department')
export class UserManageDepartment {
    @PrimaryGeneratedColumn()
    mId: number;

    @Column({ name: 'm_user_id' })
    mUserId: number;

    @Column({ name: 'm_department_id' })
    mDepartmentId: number;

    @Column({ name: 'm_created', type: 'varchar', length: 32 })
    mCreated: string;  

    @Column({ name: 'm_modified', type: 'varchar', length: 32 })
    mModified: string;
}
