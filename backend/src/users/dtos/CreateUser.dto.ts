import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter name. Not Empty!' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is not valid!' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
