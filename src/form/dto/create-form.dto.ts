import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateFormDto {
    @IsInt()
    @IsNotEmpty()
    mUserCreatedForm: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    mTitle: string;

    @IsString()
    mDescription: string;
}
