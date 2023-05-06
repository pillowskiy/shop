import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'shop_user@gmail.com',
    description: 'User name or email',
  })
  @IsString({
    message: 'This is required field',
  })
  @IsNotEmpty({
    message: 'This is required field',
  })
  public pseudonym: string;

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
    message: 'This is required field',
  })
  public password: string;
}
