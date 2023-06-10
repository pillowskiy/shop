import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
})
export class PaymentModule {}
