import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserManageDepartmentService } from './user_manage_department.service';
import { CreateUserManageDepartmentDto } from './dto/create-user_manage_department.dto';
import { UpdateUserManageDepartmentDto } from './dto/update-user_manage_department.dto';

@Controller('user-manage-department')
export class UserManageDepartmentController {
  constructor(private readonly userManageDepartmentService: UserManageDepartmentService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createUserManageDepartmentDto: CreateUserManageDepartmentDto) {
    return this.userManageDepartmentService.create(createUserManageDepartmentDto);
  }

  @Get()
  findAll() {
    return this.userManageDepartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userManageDepartmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserManageDepartmentDto: UpdateUserManageDepartmentDto) {
    return this.userManageDepartmentService.update(+id, updateUserManageDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManageDepartmentService.remove(+id);
  }
}
