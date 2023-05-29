import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './components/user/user.module';
import { CategoryModule } from './components/category/category.module';
import { ReviewModule } from './components/review/review.module';
import { StatisticModule } from './components/statistic/statistic.module';
import { PaginationModule } from './components/pagination/pagination.module';
import { OrderModule } from './components/order/order.module';
import { ProductModule } from './components/product/product.module';
import { UploadModule } from './components/upload/upload.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    CategoryModule,
    ReviewModule,
    StatisticModule,
    PaginationModule,
    OrderModule,
    ProductModule,
    UploadModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
