import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { PaginationService } from '../pagination/pagination.service';
import { CommentSort, FilterDto } from './dto/filter.dto';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { commentSelect } from './prisma.partials';
import { CommentDto } from './dto/comment.dto';
import { matchRoles } from '@src/utils/Util';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) {}

  public async getAll(userId: number, dto: FilterDto) {
    const prismaSort: Prisma.CommentOrderByWithRelationInput[] = [];
    switch (dto.sort) {
      case CommentSort.Oldest:
        prismaSort.push({ createdAt: 'asc' });
        break;
      default:
        prismaSort.push({ createdAt: 'desc' });
    }

    const { skip, perPage } = this.pagination.getPagination(dto);
    const whereInput: Prisma.CommentWhereInput = {
      userId,
    };

    const comments = await this.prisma.comment.findMany({
      where: whereInput,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: commentSelect,
    });

    return {
      length: await this.prisma.comment.count({
        where: whereInput,
      }),
      comments,
    };
  }

  public async create(userId: number, authorId: number, dto: CommentDto) {
    const { canPostComment, comment } = await this.prisma.comment
      .findFirst({
        where: { authorId, userId },
        select: commentSelect,
      })
      .then((comment) => ({
        canPostComment: !comment || userId === authorId,
        comment,
      }));

    if (!canPostComment) {
      throw new ForbiddenException(
        `You have already left a comment to a user ${comment.user.name}`,
      );
    }

    try {
      return await this.prisma.comment.create({
        data: {
          ...dto,
          user: {
            connect: { id: userId },
          },
          author: {
            connect: { id: authorId },
          },
        },
        select: commentSelect,
      });
    } catch (_) {
      throw new InternalServerErrorException(
        'The attempt to create a review failed',
      );
    }
  }

  public async delete(executor: PrismaUser, commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException(`Cannot find comment with id ${commentId}`);
    }

    if (
      comment.authorId !== executor.id &&
      comment.userId !== executor.id &&
      matchRoles(['Admin'], executor.roles)
    ) {
      throw new ForbiddenException('You are not allowed to do this action');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
