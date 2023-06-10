import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';
import { user } from 'src/config/docs/swagger.entity';
import { Gender } from '@prisma/client';

export class UserDto {
  @IsInt()
  @Type(() => Number)
  public id: number;

  @ApiProperty({
    example: user.email,
    description: 'The user email address',
  })
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiProperty({
    example: user.name + '_Modify',
    description: 'The user username (optional)',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(42)
  public name?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user avatar url (optional)',
  })
  @IsOptional()
  @IsString()
  public avatarURL?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user password (optional)',
  })
  @IsOptional()
  @MaxLength(36, {
    message: 'User name must not exceed 24 characters',
  })
  @IsString({
    message: 'Invalid value',
  })
  public password?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user phone number (optional)',
  })
  @IsOptional()
  @IsString()
  public phone?: string;

  @MaxLength(256)
  @IsOptional()
  @IsString()
  public aboutMe?: string;

  @IsDateString()
  @MinDate(new Date(1950, 0, 1))
  @MaxDate(new Date(2014, 0, 1))
  @Type(() => Date)
  @IsOptional()
  public birthDate?: Date;

  @IsEnum(Gender)
  @IsOptional()
  public gender?: Gender;
}
