import { IsString, IsEmail, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  mUserName: string;

  @IsEmail()
  @IsNotEmpty()
  mEmail: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  mPassword: string;
}