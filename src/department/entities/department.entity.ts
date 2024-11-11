import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    mId: number;  

    @Column({ name: 'm_name' })
    mName: string;
}
