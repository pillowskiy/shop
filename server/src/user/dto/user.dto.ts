import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public avatarURL?: string;

  @IsOptional()
  public password?: string;

  @IsOptional()
  @IsString()
  public phone?: string;
}
