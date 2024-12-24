import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {

  @IsString()
  @IsNotEmpty()
  mContent: string;

  @IsInt()
  @IsNotEmpty()
  mTaskId: number;

  @IsInt()
  @IsNotEmpty()
  mUserId: number;
}