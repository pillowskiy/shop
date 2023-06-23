import { PaymentType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';

export class PaymentDto {
  @IsNumberString(
    {},
    {
      message: 'The card number consists of 16 digits',
    },
  )
  @MaxLength(16, {
    message: 'The card number consists of 16 digits',
  })
  @MinLength(16, {
    message: 'The card number consists of 16 digits',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly cardNumber: string;

  @IsDateString()
  @MinDate(new Date(), {
    message: 'The card has expired',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly cardExpiresAt: Date;

  @IsNumberString()
  @MaxLength(3)
  @MinLength(3)
  @IsNotEmpty({ message: 'This field is required' })
  public readonly cardCvv: string;

  @IsEnum(PaymentType)
  @IsNotEmpty({ message: 'This field is required' })
  public readonly type: PaymentType;
}
