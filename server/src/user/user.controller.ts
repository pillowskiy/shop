import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  public getProfile(@User('id') userId: number) {
    return this.userService.getProfileById(userId);
  }

  @Put('profile')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  public updateProfile(@User('id') userId: number, @Body() userDto: UserDto) {
    return this.userService.updateProfile(userId, userDto);
  }
}
