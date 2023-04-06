import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/:id')
  @Auth()
  public async getUserOrders(@Param('id') userId: string) {
    return this.orderService.getUserOrders(+userId);
  }
}
