import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { PaymentDto } from './dto/payment.dto';
import { hash } from 'argon2';
import { paymentSelect } from './prisma.partials';
import { PaymentType } from '@prisma/client';
import { generateCcNumber } from 'optima-ccgen';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(userId: number) {
    return this.prisma.payment.findMany({
      where: { userId },
      select: paymentSelect,
    });
  }

  public async createPayment(userId: number, dto: PaymentDto) {
    return this.prisma.payment.create({
      data: {
        ...dto,
        cardCvv: await hash(dto.cardCvv),
        user: {
          connect: { id: userId },
        },
      },
      select: paymentSelect,
    });
  }

  public async deletePayment(userId: number, paymentId: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      select: paymentSelect,
    });
    if (!payment) {
      throw new NotFoundException('Cannot find payment method');
    }

    if (payment.userId !== userId) {
      throw new ForbiddenException('You cannot delete this payment method!');
    }

    return this.prisma.payment.delete({
      where: { id: paymentId },
      select: paymentSelect,
    });
  }

  public async createMagicCard(userId: number) {
    const hasMagicCard = await this.prisma.payment.findFirst({
      where: { userId, type: PaymentType.MAGIC },
    });

    if (hasMagicCard) {
      throw new ForbiddenException('You already have a magic card');
    }

    return this.createPayment(userId, {
      cardNumber: generateCcNumber('1234', 16),
      cardExpiresAt: new Date(new Date().getFullYear() + 4, 1, 1),
      cardCvv: '000',
      type: PaymentType.MAGIC,
    });
  }
}
