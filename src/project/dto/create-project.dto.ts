import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  mName: string;

  @IsString()
  @IsNotEmpty()
  mDescription: string;

  @IsInt()
  @IsNotEmpty()
  mOwnerId: number;

  @IsString()
  @IsNotEmpty()
  mStartDate: string;

  @IsString()
  @IsNotEmpty()
  mEndDate: string;
}