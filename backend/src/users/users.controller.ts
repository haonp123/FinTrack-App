import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const user = await this.usersService.findById(id);
    if (!user) throw new HttpException('User Not Found', 404);
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('Update User...');
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const updatedUser = await this.usersService.updateById(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User Not Found', 404);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const deletedUser = await this.usersService.deleteById(id);
    if (!deletedUser) throw new HttpException('User Not Found', 404);
    return deletedUser;
  }
}
