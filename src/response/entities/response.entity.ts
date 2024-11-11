import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('response')
export class Response {
    @PrimaryGeneratedColumn()
    mId: number;

    @Column({ name: 'm_form_id' })
    mFormId: number;

    @Column({ name: 'm_user_id' })
    mUserId: number;

    @Column({ name: 'm_target_user_id' })
    mTargetUserId: number;

    @Column({ name: 'm_type' })
    mType: string;

    @Column({ name: 'm_created', type: 'varchar', length: 19 })
    mCreated: string;  

    @Column({ name: 'm_modified', type: 'varchar', length: 19 })
    mModified: string;
}
