import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ShippingController],
  providers: [ShippingService, PrismaService],
})
export class ShippingModule {}
