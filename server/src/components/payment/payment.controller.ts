import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  ParseIntPipe,
  Delete,
  Param,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Auth()
  @HttpCode(200)
  @Get()
  public getAll(@User('id') userId: number) {
    return this.paymentService.getAll(userId);
  }

  @Auth()
  @Post()
  public create(@User('id') userId: number, @Body() dto: PaymentDto) {
    return this.paymentService.createPayment(userId, dto);
  }

  @Auth()
  @Delete(':id')
  public delete(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
  ) {
    return this.paymentService.deletePayment(userId, paymentId);
  }

  @Auth()
  @Post('/magic')
  public createMagicCard(@User('id') userId: number) {
    return this.paymentService.createMagicCard(userId);
  }
}
