import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { ShippingDto } from './dto/shipping.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class ShippingService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: ShippingDto, userId: number) {
    return this.prisma.shipping.create({
      data: {
        ...dto,
        user: { connect: { id: userId } },
      },
    });
  }

  public async delete(shippingId: number, userId: number) {
    const shipping = await this.prisma.shipping.findUnique({
      where: { id: shippingId },
      select: { id: true, userId: true, orders: true },
    });

    if (!shipping) {
      throw new NotFoundException(`Cannot find shipping with id ${shippingId}`);
    }

    if (shipping.userId !== userId) {
      throw new ForbiddenException('You cannot delete this shipping method!');
    }

    const isSomeOrdersPending = shipping.orders.some(
      (order) => order.status === OrderStatus.PENDING,
    );
    if (isSomeOrdersPending) {
      throw new ForbiddenException(
        `You cannot delete the delivery method to which an active order is linked`,
      );
    }

    return this.prisma.shipping.delete({
      where: { id: shippingId },
    });
  }

  public async getAll(userId: number) {
    return this.prisma.shipping.findMany({
      where: { userId },
    });
  }
}
