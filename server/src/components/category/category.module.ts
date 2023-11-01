import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '@src/prisma.service';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, PaginationService],
  exports: [CategoryService],
})
export class CategoryModule {}
