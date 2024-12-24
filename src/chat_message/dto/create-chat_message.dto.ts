import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatMessageDto {
    @IsInt()
    @IsNotEmpty()
    mChatGroupId: number;

    @IsInt()
    @IsNotEmpty()
    mUserId: number;

    @IsString()
    @IsNotEmpty()
    mMessage: string;
}