import { PartialType } from '@nestjs/mapped-types';
import { CreateUserManageDepartmentDto } from './create-user_manage_department.dto';

export class UpdateUserManageDepartmentDto extends PartialType(CreateUserManageDepartmentDto) {}
