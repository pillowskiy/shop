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
import { CreateUserDto, JwtRefreshTokenDto, LoginDto } from './dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponseType } from './auth.swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login to system' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthResponseType })
  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register new user in our service' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, type: AuthResponseType })
  @UsePipes(new ValidationPipe())
  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Refresh jwt tokens from refresh' })
  @ApiBody({ type: JwtRefreshTokenDto })
  @ApiResponse({ status: 200, type: AuthResponseType })
  @UsePipes(new ValidationPipe())
  @Get('refresh')
  async refresh(@Body() dto: JwtRefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
