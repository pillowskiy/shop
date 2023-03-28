import { IsString } from 'class-validator';

export class JwtRefreshTokenDto {
  @IsString()
  refreshToken: string;
}
