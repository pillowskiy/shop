import { PaymentType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';

export class PaymentDto {
  @IsNumberString()
  @MaxLength(8)
  @MinLength(8)
  public cardNumber: string;

  @IsDateString()
  @MinDate(new Date())
  public cardExpiresAt: Date;

  @IsNumberString()
  @MaxLength(3)
  @MinLength(3)
  public cardCvv: string;

  @IsEnum(PaymentType)
  public type: PaymentType;
}
