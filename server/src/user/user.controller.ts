import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
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
  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  public updateProfile(@User('id') userId: number, @Body() userDto: UserDto) {
    return this.userService.updateProfile(userId, userDto);
  }

  @Patch('profile/products/favorite/:productId')
  @Auth()
  @HttpCode(200)
  public toggleFavoriteProduct(
    @User('id') userId: number,
    @Param('productId') productId: string,
  ) {
    return this.userService.toggleFavoriteProduct(userId, +productId);
  }
}
