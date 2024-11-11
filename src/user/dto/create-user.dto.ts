import { IsString, IsEmail, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  mName: string;

  @IsEmail()
  @IsNotEmpty()
  mEmail: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  mPassword: string;

  @IsInt()
  @IsNotEmpty()
  mDepartmentId: number;
}