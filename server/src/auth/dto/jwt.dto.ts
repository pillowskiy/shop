import { IsString } from 'class-validator';

export class JwtRefreshTokenDto {
  @IsString()
  public refreshToken: string;
}
