import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtRefreshTokenDto } from '../dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  public async generate(userId: number) {
    const accessToken = this.jwt.sign({ id: userId }, { expiresIn: '30m' });
    const refreshToken = this.jwt.sign({ id: userId }, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  public async validate(dto: JwtRefreshTokenDto): Promise<number> {
    const payload: unknown = await this.jwt.verifyAsync(dto.refreshToken);
    if (
      typeof payload !== 'object' ||
      !('id' in payload) ||
      typeof payload.id !== 'number'
    ) {
      throw new UnauthorizedException('Authorization failed');
    }
    return payload.id;
  }
}
