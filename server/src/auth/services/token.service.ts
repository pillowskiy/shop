import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public async generate(userId: number) {
    const accessToken = this.jwt.sign(
      { id: userId },
      { expiresIn: this.configService.get<number>('ACCESS_EXPIRES') },
    );
    const refreshToken = this.jwt.sign(
      { id: userId },
      { expiresIn: this.configService.get<number>('REFRESH_EXPIRES') },
    );
    return { accessToken, refreshToken };
  }

  public async validate(refreshToken: string): Promise<number> {
    const payload: unknown = await this.jwt.verifyAsync(refreshToken);
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
