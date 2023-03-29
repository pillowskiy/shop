import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  static toJSON(dto: UserDto) {
    return {
      email: dto.email,
      name: dto.name,
      avatarURL: dto.avatarURL,
      phone: dto.phone,
    };
  }
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
