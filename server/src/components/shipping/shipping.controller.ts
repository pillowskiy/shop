import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingDto } from './dto/shipping.dto';
import { User } from '@src/decorators/user.decorator';
import { Auth } from '@src/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Auth()
  @Get()
  public async getAll(@User('id') userId: number) {
    return this.shippingService.getAll(userId);
  }

  @Auth()
  @Post()
  public async create(@Body() dto: ShippingDto, @User('id') userId: number) {
    return this.shippingService.create(dto, userId);
  }

  @Auth()
  @Delete('/:id')
  public async delete(
    @Param('id') shippingId: number,
    @User('id') userId: number,
  ) {
    return this.shippingService.delete(shippingId, userId);
  }
}
