import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
    @IsInt()
    @IsNotEmpty()
    mQuestionId: number;

    @IsString()
    @IsNotEmpty()
    mOptionText: string;
}
