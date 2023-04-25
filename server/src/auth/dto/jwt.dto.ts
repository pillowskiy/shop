import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JwtRefreshTokenDto {
  @ApiProperty({
    example: '6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
    description: 'JWT refresh token',
  })
  @IsString()
  public refreshToken: string;
}
