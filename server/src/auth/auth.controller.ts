import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserDto, JwtRefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @Get('refresh')
  async refresh(@Body() dto: JwtRefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
