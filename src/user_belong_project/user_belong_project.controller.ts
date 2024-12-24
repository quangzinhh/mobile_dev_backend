import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBelongProjectService } from './user_belong_project.service';
import { CreateUserBelongProjectDto } from './dto/create-user_belong_project.dto';
import { UpdateUserBelongProjectDto } from './dto/update-user_belong_project.dto';

@Controller('user-belong-project')
export class UserBelongProjectController {
  constructor(private readonly userBelongProjectService: UserBelongProjectService) {}

  @Post()
  create(@Body() createUserBelongProjectDto: CreateUserBelongProjectDto) {
    return this.userBelongProjectService.create(createUserBelongProjectDto);
  }

  @Get()
  findAll() {
    return this.userBelongProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBelongProjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBelongProjectDto: UpdateUserBelongProjectDto) {
    return this.userBelongProjectService.update(+id, updateUserBelongProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBelongProjectService.remove(+id);
  }
}
