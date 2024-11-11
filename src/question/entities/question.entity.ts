import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    mId: number;

    @Column({ name: 'm_form_id' })
    mFormId: number;

    @Column({ name: 'm_question_text' })
    mQuestionText: string;

    @Column({ name: 'm_question_type' })
    mQuestionType: string;

    @Column({ name: 'm_is_required' })
    mIsRequired: boolean;

    @Column({ name: 'm_created', type: 'varchar', length: 19 })
    mCreated: string;  

    @Column({ name: 'm_modified', type: 'varchar', length: 19 })
    mModified: string;
}
