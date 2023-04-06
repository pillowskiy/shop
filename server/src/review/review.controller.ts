import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  public getAll(@Param('id') productId: string) {
    return this.reviewService.getAll(+productId);
  }

  @Get('/avg/:id')
  public getAvgRating(@Param('id') productId: string) {
    return this.reviewService.getAvgRating(+productId);
  }

  @Post('/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  public create(
    @Param('id') productId: string,
    @Body() dto: ReviewDto,
    @User('id') userId: string,
  ) {
    return this.reviewService.create(+userId, +productId, dto);
  }
}
