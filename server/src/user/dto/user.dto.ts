import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { user } from 'src/config/docs/swagger.entity';

export class UserDto {
  @ApiProperty({
    example: user.email,
    description: 'The user email address',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: user.name + '_Modify',
    description: 'The user username (optional)',
  })
  @IsOptional()
  @IsString()
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
  public password?: string;

  @ApiProperty({
    example: user.avatarURL,
    description: 'The user phone number (optional)',
  })
  @IsOptional()
  @IsString()
  public phone?: string;
}
