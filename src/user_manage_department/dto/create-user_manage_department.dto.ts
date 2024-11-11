import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserManageDepartmentDto {
    @IsInt()
    @IsNotEmpty()
    mUserId: number;

    @IsInt()
    @IsNotEmpty()
    mDepartmentId: number;
}
