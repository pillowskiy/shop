import { Body, Controller, Get, Post, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
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
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation(order.getByUserId.operation)
  @ApiParam(order.getByUserId.param)
  @ApiOkResponse(order.getByUserId.response)
  @Auth()
  @HttpStatus(200)
  @Get()
  public async getUserOrders(@User('id') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Auth()
  @Post()
  public createOrder(@Body() dto: CreateOrderDto, @User('id') userId: number) {
    return this.orderService.create(dto, userId);
  }
}
