import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';
import { userSelect } from './partials/prisma.partials';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  public async getProfileById(
    userId: number,
    selectObject: Prisma.UserSelect = {},
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...userSelect,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            slug: true,
          },
        },
        ...selectObject,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
