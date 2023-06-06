import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async create({ items }: CreateOrderDto, userId: number) {
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

    const order = this.prisma.order.create({
      data: {
        userId,
        items: {
          createMany: { data },
        },
      },
    });

    return order;
  }
}
