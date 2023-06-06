import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreatePromoCodeDto) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (promoCode) {
      throw new BadRequestException(
        `Promo-code with name ${dto.name} already exist`,
      );
    }

    return this.prisma.promoCode.create({
      data: {
        ...dto,
      },
    });
  }

  public async remove(promoId: number) {
    await this.findOne({ where: { id: promoId } });
    return this.prisma.promoCode.delete({
      where: { id: promoId },
    });
  }

  public async findOne({ where }: Prisma.PromoCodeFindUniqueArgs) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where,
    });

    if (!promoCode) {
      throw new NotFoundException(`This promo-code is unvaliable`);
    }

    return promoCode;
  }

  public async activate(orderId: number, promoId: number) {
    await this.isPromoUsed(orderId);
    return this.prisma.promoCode.update({
      where: { id: promoId },
      data: {
        orders: {
          connect: { id: orderId },
        },
      },
    });
  }

  private async isPromoUsed(orderId: number) {
    const promoCode = await this.prisma.promoCode.findFirst({
      where: {
        orders: { some: { id: orderId } },
      },
    });

    if (promoCode) {
      throw new BadRequestException(
        `You already used promo-code ${promoCode.name}`,
      );
    }

    return promoCode;
  }
}
