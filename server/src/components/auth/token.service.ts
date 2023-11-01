import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  public generateAccess(userId: number) {
    const expiresIn = this.configService.get<number>('ACCESS_EXPIRES');
    return this.jwt.sign({ id: userId }, { expiresIn });
  }
  public generateRefresh(userId: number) {
    const expiresIn = this.configService.get<number>('REFRESH_EXPIRES');
    return this.jwt.sign({ id: userId }, { expiresIn });
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
