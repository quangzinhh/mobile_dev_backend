import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBelongProjectDto } from './create-user_belong_project.dto';

export class UpdateUserBelongProjectDto extends PartialType(CreateUserBelongProjectDto) {}
