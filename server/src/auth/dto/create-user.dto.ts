import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'shop_user@gmail.com',
    description: 'Valid email address',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password (min length - 6, max length - 32 characters',
  })
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

  @ApiProperty({
    example: 'User',
    description: 'String with max length - 24 characters',
  })
  @MaxLength(24, {
    message: 'User name must not exceed 24 characters',
  })
  @IsString({
    message: 'Invalid value',
  })
  public name: string;
}
