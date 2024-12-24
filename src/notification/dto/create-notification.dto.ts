import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
    @IsInt()
    @IsNotEmpty()
    mUserId: number;

    @IsString()
    @IsNotEmpty()
    mTitle: string;

    @IsString()
    @IsNotEmpty()
    mContent: string;
}