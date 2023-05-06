import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { PrismaService } from '../../../prisma.service';
import { CreateUserDto, LoginDto } from '../dto';
import { TokenService } from './token.service';
import { userSelect } from '../prisma.partials';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly token: TokenService,
  ) {}
  public async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    const userData = await this.prisma.user.findFirst({
      where: { OR: [{ name }, { email }] },
    });
    if (userData) {
      throw new BadRequestException(
        'A user with that name or email already exists',
      );
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: await hash(password),
      },
    });

    const tokens = {
      refreshToken: this.token.generateRefresh(user.id),
      accessToken: this.token.generateAccess(user.id),
    };
    return { user, ...tokens };
  }
  public async refresh(refreshToken: string) {
    /* 
      Generate access token from refresh
      
      Since the 'refresh' method takes 'refreshToken' as an argument,
      it makes no sense to generate a new refresh token,
      since it is still valid (based on the 'maxAge' parameter in the 'cookie-parser' library).
      
      In simple words, if the refresh token checked by 'CookiePipe' (i.e., it exists in cookies)
      has reached the processing by the service and has been validate,
      then it is valid and there is no reason in generating a new one.

      Perhaps my opinion is not correct,
      but I think it is better to prevent it through a measured amount of refresh tokens.
      Moreover, on the frontend, most articles used this method to get data for the state manager (redux, for example).
     */
    const userId = await this.token.validate(refreshToken);
    const userData = await this.prisma.user.findUnique({
      where: { id: userId },
      select: userSelect,
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const accessToken = this.token.generateAccess(userId);
    return { user: userData, refreshToken, accessToken };
  }
  public async login({ pseudonym, password }: LoginDto) {
    const userData = await this.prisma.user.findFirst({
      where: { OR: [{ name: pseudonym }, { email: pseudonym }] },
      select: { ...userSelect, password: true },
    });

    if (!userData) {
      throw new NotFoundException(
        'You have entered an incorrect login or password',
      );
    }

    const isPasswordValid = await verify(userData.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'You have entered an incorrect login or password',
      );
    }

    // TEMP =(
    delete userData.password;

    const tokens = {
      refreshToken: this.token.generateRefresh(userData.id),
      accessToken: this.token.generateAccess(userData.id),
    };

    return { user: userData, ...tokens };
  }
}
