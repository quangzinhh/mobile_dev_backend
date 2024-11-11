import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    mName: string;
}
