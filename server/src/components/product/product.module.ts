import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '@src/prisma.service';
import { PaginationService } from '@src/components/pagination/pagination.service';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService, UploadService],
})
export class ProductModule {}
