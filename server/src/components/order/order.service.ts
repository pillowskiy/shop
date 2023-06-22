import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';
import { orderItemSelect, orderSelect } from './prisma.partials';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: orderSelect,
    });
  }

  public async create(
    { items, shippingId, paymentId, promoId }: CreateOrderDto,
    userId: number,
  ) {
    const productIds = items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const quantities = Object.fromEntries(
      items.map((item): [number, number] => [item.productId, item.quantity]),
    );

    const data: Prisma.Enumerable<Prisma.OrderItemCreateManyOrderInput> =
      products.map((product) => ({
        quantity: quantities[product.id] || 1,
        productId: product.id,
        price: product.price,
      }));

    const createData: Prisma.OrderCreateInput = {
      user: {
        connect: { id: userId },
      },
      items: {
        createMany: { data },
      },
      shipping: {
        connect: { id: shippingId },
      },
    };

    if (paymentId) {
      createData.payment = { connect: { id: paymentId } };
    }

    if (promoId) {
      createData.promoCode = { connect: { id: promoId } };
    }

    return this.prisma.order.create({
      data: createData,
      select: orderSelect,
    });
  }

  public async getItems(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`No products found to order #${orderId}`);
    }

    if (order.userId !== userId) {
      throw new ForbiddenException("You cannot view other people's orders");
    }

    return this.prisma.orderItem.findMany({
      where: { orderId },
      select: orderItemSelect,
    });
  }
}
