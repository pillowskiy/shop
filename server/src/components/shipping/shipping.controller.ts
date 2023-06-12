import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingDto } from './dto/shipping.dto';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @Auth()
  public async create(@Body() dto: ShippingDto, @User('id') userId: number) {
    return this.shippingService.create(dto, userId);
  }

  @Delete('/:id')
  @Auth()
  public async delete(
    @Param('id') shippingId: number,
    @User('id') userId: number,
  ) {
    return this.shippingService.delete(shippingId, userId);
  }
}
