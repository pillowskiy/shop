import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'shop_user@gmail.com',
    description: 'User email (optional if name is provided)',
  })
  @IsEmail()
  @IsOptional()
  public email?: string;

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
    description:
      'User username, max - 24 characters (optional if email is provided)',
  })
  @MaxLength(24, {
    message: 'User name must not exceed 24 characters',
  })
  @IsString({
    message: 'Invalid value',
  })
  @IsOptional()
  public name?: string;
}
