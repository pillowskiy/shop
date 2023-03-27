import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from './../prisma.service';
import { AuthDto } from './auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  public async register(dto: AuthDto) {
    const existUser = await Promise.all([
      this.prisma.user.findUnique({ where: { email: dto.email } }),
      this.prisma.user.findUnique({ where: { name: dto.name } }),
    ]);
    if (existUser.some((user) => user)) {
      throw new BadRequestException('User already exist!');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        avatarURL: 'https://www.univ.kiev.ua/img/kobzar.jpg',
        password: await hash(dto.password),
      },
    });

    const tokens = await this.generateTokens(user.id);
    return { user, ...tokens };
  }

  private async generateTokens(userId: number) {
    const accessToken = this.jwt.sign({ id: userId }, { expiresIn: '30m' });
    const refreshToken = this.jwt.sign({ id: userId }, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  private userFields({ id, email }: User) {
    return { id, email };
  }
}
