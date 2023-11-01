import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';
import { PrismaService } from '@src/prisma.service';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, PaginationService],
})
export class CommentsModule {}
