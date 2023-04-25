import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/decorators/auth.decorator';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: "Get user's orders by userId (only for auth users)",
  })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiOkResponse({
    status: 200,
    schema: {
      type: 'Order',
      example: {
        id: 1,
        createdAt: new Date(),
        status: OrderStatus.PENDING,
        userId: 1,
        user: {
          id: 1,
          name: 'User',
          email: 'shop_user@gmail.com',
          avatarURL: 'https://somewhere.png/',
          phone: '0123456789',
          roles: ['User'],
        },
        items: [
          {
            id: 1,
            createdAt: new Date(),
            quantity: 2,
            price: 100,
            productId: 1,
            product: {
              id: 1,
              createdAt: new Date(),
              name: 'Car',
              slug: 'car',
              description: 'Some description',
              images: ['https://somewhere.png/1', 'https://somewhere.png/2'],
              quantity: 500,
              sold: 1020,
              category: {
                id: 1,
                name: 'Toy',
                slug: 'toy',
              },
            },
          },
        ],
      },
    },
  })
  @Get('/:id')
  @Auth()
  public async getUserOrders(@Param('id', ParseIntPipe) userId: number) {
    return this.orderService.getUserOrders(userId);
  }
}
