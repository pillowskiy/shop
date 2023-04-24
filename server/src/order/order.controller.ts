import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/:id')
  @Auth()
  public async getUserOrders(@Param('id', ParseIntPipe) userId: number) {
    return this.orderService.getUserOrders(userId);
  }
}
