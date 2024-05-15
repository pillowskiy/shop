import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';
import { user } from '@src/config/docs/swagger.entity';
import { Gender } from '@prisma/client';

export class UserDto {
  @IsInt({ message: 'The id must be an integer value' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'User ID is a required field' })
  public readonly id: number;

  @ApiProperty({
    example: user.email,
    description: 'The user email address',
  })
  @IsEmail({}, { message: 'Email address is incorrect' })
  @IsOptional()
  public readonly email?: string;

  @ApiProperty({
    example: user.name + '_Modify',
    description: 'The user username (optional)',
  })
  @IsString()
  @MinLength(2, { message: 'Username must be more than 2 characters long' })
  @MaxLength(42, { message: 'The username should not exceed 42 characters' })
  @IsOptional()
  public readonly name?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user avatar url (optional)',
  })
  @IsString()
  @IsOptional()
  public readonly avatarURL?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user password (optional)',
  })
  @MaxLength(36, {
    message: 'User name must not exceed 24 characters',
  })
  @IsString({
    message: 'Invalid value',
  })
  @IsOptional()
  public readonly password?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user phone number (optional)',
  })
  @IsOptional()
  @IsString()
  public readonly phone?: string;

  @MaxLength(256, { message: 'About me must not exceed 256 characters' })
  @IsOptional()
  @IsString()
  public readonly aboutMe?: string;

  @MinDate(new Date(new Date().getFullYear() - 110, 0, 1), {
    message: 'Are you sure you are 110 years old?',
  })
  @MaxDate(new Date(new Date().getFullYear() - 12, 0, 1), {
    message: 'The store can be used by persons over 12 years old',
  })
  @Type(() => Date)
  @IsOptional()
  public readonly birthDate?: Date;

  @IsEnum(Gender)
  @IsOptional()
  public readonly gender?: Gender;
}
