import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/decorators/auth.decorator';
import { NumParam } from 'src/decorators/param.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/:id')
  @Auth()
  public async getUserOrders(@NumParam('id') userId: number) {
    return this.orderService.getUserOrders(userId);
  }
}
