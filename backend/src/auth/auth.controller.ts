/* eslint-disable prettier/prettier */
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthService } from './auth.service';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(loginUserDto);
  }
}
