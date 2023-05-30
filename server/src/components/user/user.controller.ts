import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import type { User as PrismaUser } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { user } from 'src/config/docs';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation(user.profile.operation)
  @ApiResponse(user.profile.response)
  @ApiParam(user.profile.param)
  @Auth()
  @Get('profile')
  public getProfile(@User() user: PrismaUser) {
    return user;
  }

  @ApiOperation(user.profile.operation)
  @ApiResponse(user.profile.response)
  @ApiParam(user.profile.param)
  @Get('profile/:id')
  public getProfileById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getProfileById(userId);
  }

  @ApiOperation(user.updateProfile.operation)
  @ApiResponse(user.updateProfile.response)
  @ApiBody({ type: UserDto })
  @Auth()
  @HttpCode(200)
  @Put('profile')
  public updateProfile(@User('id') userId: number, @Body() userDto: UserDto) {
    return this.userService.updateProfile(userId, userDto);
  }

  @ApiOperation(user.toggleFavorite.operation)
  @ApiResponse(user.toggleFavorite.response)
  @ApiParam(user.toggleFavorite.param)
  @Auth()
  @HttpCode(200)
  @Patch('profile/products/favorite/:id')
  public toggleFavoriteProduct(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.userService.toggleFavoriteProduct(userId, productId);
  }

  @ApiOperation(user.toggleFavorite.operation)
  @ApiResponse(user.toggleFavorite.response)
  @ApiParam(user.toggleFavorite.param)
  @Auth()
  @HttpCode(200)
  @Patch('profile/reviews/helpful/:id')
  public toggleHelpfulReview(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.userService.toggleHelpful(userId, reviewId);
  }
}
