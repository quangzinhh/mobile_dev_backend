import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatMemberDto {
    @IsInt()
    @IsNotEmpty()
    mChatGroupId: number;

    @IsInt()
    @IsNotEmpty()
    mUserId: number;
}