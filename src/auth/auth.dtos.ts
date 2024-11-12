import { IsString, IsEmail, IsInt, Length, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  mEmail: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  mPassword: string;
}