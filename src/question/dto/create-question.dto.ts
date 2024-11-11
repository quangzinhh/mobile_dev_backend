import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
    @IsInt()
    @IsNotEmpty()
    mFormId: number;

    @IsString()
    @IsNotEmpty()
    mQuestionText: string;

    @IsString()
    @IsNotEmpty()
    mQuestionType: string;

    @IsString()
    @IsNotEmpty()
    mIsRequired: boolean;
}
