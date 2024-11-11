import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnswerDto {
    @IsInt()
    @IsNotEmpty()
    mResponseId: number;

    @IsInt()
    @IsNotEmpty()
    mQuestionId: number;

    @IsString()
    @IsNotEmpty()
    mAnswerText: string;

    @IsInt()
    @IsNotEmpty()
    mOptionId: number;

    @IsOptional()
    @IsString()
    mReason: string;
}
