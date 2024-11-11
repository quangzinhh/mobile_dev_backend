import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateResponseDto {
    @IsInt()
    @IsNotEmpty()
    mFormId: number;

    @IsInt()
    @IsNotEmpty()
    mUserId: number;
    
    @IsInt()
    @IsNotEmpty()
    mTargetUserId: number;

    @IsString()
    @IsNotEmpty()
    mType: string;
}
