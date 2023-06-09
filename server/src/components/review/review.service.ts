import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { reviewSelect } from './prisma.partials';
import { NotFoundException } from '@nestjs/common/exceptions';
import type { FilterDto } from '../product/dto/filter.dto';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  public async getAvgRating(productId: number) {
    const data = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    return data._avg.rating || 0;
  }
  public async getAll(productId: number, dto: FilterDto) {
    const { skip, perPage } = this.paginationService.getPagination(dto);
    const reviews = await this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip,
      select: reviewSelect,
    });
    return {
      reviews,
      length: await this.prisma.review.count({
        where: { productId },
      }),
    };
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
