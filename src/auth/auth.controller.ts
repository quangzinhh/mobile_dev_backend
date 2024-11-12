// src/auth/auth.controller.ts
import { Controller, Post, Get, Body, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './request-with-user.interface';
import { UserLoginDto } from './auth.dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login') 
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() user: UserLoginDto) {
    return this.authService.login(user.mEmail, user.mPassword);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req:RequestWithUser) {
    const userId = req.user.mId;
    return this.authService.getProfile(userId);
  }
}