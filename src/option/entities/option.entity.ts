import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('option')
export class Option {
    @PrimaryGeneratedColumn()
    mId: number;

    @Column({ name: 'm_question_id' })
    mQuestionId: number;

    @Column({ name: 'm_option_text' })
    mOptionText: string;

    @Column({ name: 'm_created', type: 'varchar', length: 32 })
    mCreated: string;  

    @Column({ name: 'm_modified', type: 'varchar', length: 32 })
    mModified: string;
}
