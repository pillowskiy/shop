import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';
import { NumParam } from 'src/decorators/param.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  public getAll(@NumParam('id') productId: number) {
    return this.reviewService.getAll(productId);
  }

  @Get('/avg/:id')
  public getAvgRating(@NumParam('id') productId: number) {
    return this.reviewService.getAvgRating(productId);
  }

  @Post('/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  public create(
    @NumParam('id') productId: number,
    @Body() dto: ReviewDto,
    @User('id') userId: string,
  ) {
    return this.reviewService.create(+userId, productId, dto);
  }
}
