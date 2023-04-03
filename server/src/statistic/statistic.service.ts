import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {
  constructor(private readonly userService: UserService) {}

  public async getStatistic(userId: number) {
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.userService.getProfileById(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
      favorites: true,
    });

    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'Favorites',
        value: user.favorites.length,
      },
      {
        name: 'Money spent',
        value: 1000,
      },
    ];
  }
}
