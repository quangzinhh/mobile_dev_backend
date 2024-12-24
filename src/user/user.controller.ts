import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/auth/request-with-user.interface';
import { CreateUserBelongProjectDto } from 'src/user_belong_project/dto/create-user_belong_project.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get(':userId/projects/:projectId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  userJoinProject(@Param('userId') userId: number, @Param('projectId') projectId: number) {
    return this.userService.userJoinProject(userId, projectId);
  }

  @Get(':id/notifications')
  getNotifications(@Param('id') id: string) {
    return this.userService.getNotifications(+id);
  }
}
