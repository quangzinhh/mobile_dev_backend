import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    mId: number;

    @Column({ name: 'm_response_id' })
    mResponseId: number;

    @Column({ name: 'm_question_id' })
    mQuestionId: number;

    @Column({ name: 'm_answer_text' })
    mAnswerText: string;

    @Column({ name: 'm_option_id' })
    mOptionId: number;

    @Column({ name: 'm_reason' })
    mReason: string;

    @Column({ name: 'm_created', type: 'varchar', length: 19 })
    mCreated: string;  

    @Column({ name: 'm_modified', type: 'varchar', length: 19 })
    mModified: string;
}
