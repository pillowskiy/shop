import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShippingDto } from './dto/shipping.dto';

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
    });

    if (!shipping) {
      throw new NotFoundException(`Cannot find shipping with id ${shippingId}`);
    }

    if (shipping.userId !== userId) {
      throw new ForbiddenException('You cannot delete this shipping method!');
    }

    return this.prisma.shipping.delete({
      where: { id: userId },
    });
  }
}
