import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  mName: string;

  @IsString()
  @IsNotEmpty()
  mDescription: string;

  @IsString()
  @IsNotEmpty()
  mStatus: string;

  @IsInt()
  @IsNotEmpty()
  mProjectId: number;

  @IsInt()
  @IsNotEmpty()
  mReporterId: number;

  @IsInt()
  @IsNotEmpty()
  mAssigneeId: number;

  @IsString()
  @IsNotEmpty()
  mStartDate: string;

  @IsString()
  @IsNotEmpty()
  mEndDate: string;
}