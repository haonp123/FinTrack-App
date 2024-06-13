import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { encodePassword, comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createNewUser(createUserDto);
    const token = this.jwtService.sign({ id: newUser._id });
    return {
      userId: newUser._id,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const findUser = await this.usersService.findByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException('Email or Password is incorrect!');
    }

    const isPasswordMatched = comparePasswords(password, findUser.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }
    const token = this.jwtService.sign({ id: findUser._id });
    return {
      userId: findUser._id,
      token,
    };
  }
}
