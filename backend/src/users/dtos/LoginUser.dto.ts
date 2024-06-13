import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Please enter email. Not empty!' })
  @IsEmail({}, { message: 'Email Is Not Valid' })
  email: string;

  @IsNotEmpty({ message: 'Please enter password. Not empty!' })
  @IsString()
  password: string;
}
