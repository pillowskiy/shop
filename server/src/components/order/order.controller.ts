import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/decorators/auth.decorator';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { order } from 'src/config/docs';
import { User } from '../../decorators/user.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation(order.getByUserId.operation)
  @ApiParam(order.getByUserId.param)
  @ApiOkResponse(order.getByUserId.response)
  @Auth()
  public async getUserOrders(@User('id') userId: number) {
    return this.orderService.getUserOrders(userId);
  }
}
