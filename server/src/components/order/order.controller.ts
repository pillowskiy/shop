import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  ParseIntPipe,
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
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation(order.getByUserId.operation)
  @ApiParam(order.getByUserId.param)
  @ApiOkResponse(order.getByUserId.response)
  @Auth()
  @HttpCode(200)
  @Get()
  public async getUserOrders(@User('id') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Auth()
  @Post()
  public createOrder(@Body() dto: CreateOrderDto, @User('id') userId: number) {
    return this.orderService.create(dto, userId);
  }

  @Auth()
  @HttpCode(200)
  @Get('/items/:orderId')
  public get(
    @Param('orderId', ParseIntPipe) orderId: number,
    @User('id') userId: number,
  ) {
    return this.orderService.getItems(orderId, userId);
  }
}
