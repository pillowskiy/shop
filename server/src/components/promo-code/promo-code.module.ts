import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PromoCodeController],
  providers: [PromoCodeService, PrismaService],
  exports: [PromoCodeService],
})
export class PromoCodeModule {}
