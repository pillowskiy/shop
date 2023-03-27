import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  public email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(32, {
    message: 'Password must not exceed 32 characters',
  })
  @IsString({
    message: 'Invalid value',
  })
  public password: string;

  @MaxLength(24, {
    message: 'User name must not exceed 24 characters',
  })
  @IsString({
    message: 'Invalid value',
  })
  public name: string;
}
