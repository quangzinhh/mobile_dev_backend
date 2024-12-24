import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatGroupDto {
  @IsString()
  @IsNotEmpty()
  mName: string;

  @IsInt()
  @IsNotEmpty()
  mOwnerId: number;
}