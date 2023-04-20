import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { reviewSelect } from './prisma.partials';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAvgRating(productId: number) {
    const data = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    return data._avg.rating || 0;
  }
  public getAll(productId: number) {
    return this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      select: reviewSelect,
    });
  }
  public async create(userId: number, productId: number, dto: ReviewDto) {
    try {
      return await this.prisma.review.create({
        data: {
          ...dto,
          user: {
            connect: { id: userId },
          },
          product: {
            connect: { id: productId },
          },
        },
        select: reviewSelect,
      });
    } catch {
      throw new NotFoundException('Product not found');
    }
  }
}
