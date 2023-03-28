import {
  Body,
  Controller,
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
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('refresh')
  async refresh(@Body() dto: JwtRefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
