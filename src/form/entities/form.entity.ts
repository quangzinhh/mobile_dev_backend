import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class Form {
    @PrimaryGeneratedColumn()
    mId: number;

    @Column({ name: 'm_user_created_form' })
    mUserCreatedForm: number;

    @Column({ name: 'm_title' })
    mTitle: string;

    @Column({ name: 'm_description' })
    mDescription: string;

    @Column({ name: 'm_created', type: 'varchar', length: 19 })
    mCreated: string;  

    @Column({ name: 'm_modified', type: 'varchar', length: 19 })
    mModified: string;
}
