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
import { auth } from 'src/config/docs';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(auth.login.operation)
  @ApiBody(auth.login.body)
  @ApiResponse(auth.login.response)
  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation(auth.register.operation)
  @ApiBody(auth.register.body)
  @ApiResponse(auth.register.response)
  @UsePipes(new ValidationPipe())
  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation(auth.refresh.operation)
  @ApiBody(auth.refresh.body)
  @ApiResponse(auth.refresh.response)
  @UsePipes(new ValidationPipe())
  @Get('refresh')
  async refresh(@Body() dto: JwtRefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
