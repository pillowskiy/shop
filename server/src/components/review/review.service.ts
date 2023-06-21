import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { reviewSelect } from './prisma.partials';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { PaginationService } from '../pagination/pagination.service';
import type { FilterDto } from './dto/filter.dto';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { ReviewSort } from './dto/filter.dto';
import { matchRoles } from '../../utils/Util';
import { UploadService } from './../upload/upload.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly uploadService: UploadService,
  ) {}

  public async getAvgRating(productId: number) {
    const data = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    return data._avg.rating || 0;
  }
  public async getAll(productId: number, dto: FilterDto) {
    const prismaSort: Prisma.ReviewOrderByWithRelationInput[] = [];
    switch (dto.sort) {
      case ReviewSort.Oldest:
        prismaSort.push({ createdAt: 'asc' });
        break;
      case ReviewSort.Better:
        prismaSort.push({ rating: 'desc' });
        break;
      case ReviewSort.Worse:
        prismaSort.push({ rating: 'asc' });
        break;
      default:
        prismaSort.push({ createdAt: 'desc' });
    }

    const { skip, perPage } = this.paginationService.getPagination(dto);
    const reviews = await this.prisma.review.findMany({
      where: { productId },
      orderBy: prismaSort,
      take: perPage,
      skip,
      select: reviewSelect,
    });
    return {
      reviews,
      length: await this.countReviews(productId),
    };
  }
  public async getStatistic(productId: number) {
    const reviews = await this.prisma.review.groupBy({
      where: { productId },
      by: ['rating'],
      _count: { rating: true },
      _avg: { rating: true },
    });

    const totalRating = Object.fromEntries(
      reviews.map((review) => [review.rating, review._count.rating]),
    );
    const count = await this.countReviews(productId);

    return {
      avg: await this.getAvgRating(productId),
      intervalCounts: Array.from({ length: 5 }, (_, index) => {
        return {
          percentages: ((totalRating[index + 1] || 0) / count) * 100,
          intervalCounts: totalRating[index + 1] || 0,
          rate: index + 1,
        };
      }),
    };
  }

  public async create({
    productId,
    userId,
    dto,
    files,
    serverUrl,
  }: {
    productId: number;
    userId: number;
    dto: ReviewDto;
    files: Express.Multer.File[];
    serverUrl: string;
  }) {
    const canPostReview = await this.prisma.review
      .findFirst({
        where: { productId, userId },
      })
      .then((review) => !review);

    if (!canPostReview) {
      throw new ForbiddenException(
        `You already have a review for this product`,
      );
    }

    const uploadData = await this.uploadService.uploadFiles(files);
    const imagesURLs = uploadData.map(({ fileName, fileExtension }) => {
      return `${serverUrl}/uploads/${fileName + fileExtension}`;
    });

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
          attachments: imagesURLs,
        },
        select: reviewSelect,
      });
    } catch (_) {
      throw new InternalServerErrorException(
        'The attempt to create a review failed',
      );
    }
  }

  public async delete(executor: PrismaUser, reviewId: number) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException(`Cannot find review with id ${reviewId}`);
    }

    if (
      review.userId !== executor.id &&
      matchRoles(['Admin'], executor.roles)
    ) {
      throw new ForbiddenException('You are not allowed to do this action');
    }

    return this.prisma.review
      .delete({
        where: { id: reviewId },
      })
      .then((res) => {
        this.uploadService.unlinkFromPaths(res.attachments);
        return res;
      });
  }

  private async countReviews(productId: number) {
    return this.prisma.review.count({
      where: { productId },
    });
  }
}
