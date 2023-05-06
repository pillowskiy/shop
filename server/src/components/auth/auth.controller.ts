import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto, LoginDto } from './dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { auth } from 'src/config/docs';
import { CookieEmptyPipe, Cookies } from 'src/decorators/cookies.decorator';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/decorators/auth.decorator';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation(auth.login.operation)
  @ApiBody(auth.login.body)
  @ApiResponse(auth.login.response)
  @Post('login')
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    const data = await this.authService.login(dto);
    this.updateCookie(res, data.refreshToken);
    return data;
  }

  @ApiOperation(auth.register.operation)
  @ApiBody(auth.register.body)
  @ApiResponse(auth.register.response)
  @Post('register')
  @HttpCode(200)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const data = await this.authService.register(dto);
    this.updateCookie(res, data.refreshToken);
    return data;
  }

  @ApiOperation(auth.refresh.operation)
  @ApiResponse(auth.refresh.response)
  @Get('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refresh_token', CookieEmptyPipe) refreshToken: string,
  ) {
    const data = await this.authService.refresh(refreshToken);
    this.updateCookie(res, data.refreshToken);
    return data;
  }

  @ApiOperation(auth.logout.operation)
  @ApiResponse(auth.logout.response)
  @Auth()
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refresh_token', CookieEmptyPipe) refreshToken: string,
  ) {
    res.clearCookie('refresh_token');
    return refreshToken;
  }

  private updateCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get<number>('REFRESH_EXPIRES'),
    });
  }
}
