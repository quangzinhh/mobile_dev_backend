import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserBelongProjectDto {
  @IsInt()
  @IsNotEmpty()
  mUserId: number;

  @IsInt()
  @IsNotEmpty()
  mProjectId: number;
}