import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
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
import { OrderDto } from './dto/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation(order.getByUserId.operation)
  @ApiParam(order.getByUserId.param)
  @ApiOkResponse(order.getByUserId.response)
  @Auth()
  @Get()
  public async getUserOrders(@User('id') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Auth()
  @Post()
  public createOrder(@Body() dto: OrderDto, @User('id') userId: number) {
    return this.orderService.create(dto, userId);
  }

  @Auth()
  @Get('/items/:id')
  public getOrderItems(
    @Param('id', ParseIntPipe) orderId: number,
    @User('id') userId: number,
  ) {
    return this.orderService.getItems(orderId, userId);
  }

  @Patch('/:id')
  @Auth()
  public cancelOrder(
    @Param('id', ParseIntPipe) orderId: number,
    @User('id') userId: number,
  ) {
    return this.orderService.cancel(orderId, userId);
  }
}
