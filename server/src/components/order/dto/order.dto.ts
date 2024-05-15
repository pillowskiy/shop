import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'The order must contain at least one element' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly items: OrderItemDto[];

  @IsInt({ message: 'The shipping ID must be a number' })
  @IsPositive({ message: 'The shipping ID must be a positive number' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly shippingId: number;

  @IsInt({ message: 'The payment ID must be a number' })
  @IsPositive({ message: 'The payment ID must be a positive number' })
  @IsOptional()
  public readonly paymentId?: number;

  @IsInt({ message: 'The promo-code ID must be a number' })
  @IsPositive({ message: 'The promo-code ID must be a positive number' })
  @IsOptional()
  public readonly promoId?: number;
}

export class OrderItemDto {
  @IsInt({ message: 'The product ID must be a number' })
  @IsPositive({ message: 'The product ID must be a positive number' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly productId: number;

  @IsInt({ message: 'The quantity of goods must be a positive number' })
  @IsPositive({ message: 'The quantity of goods must be a positive number' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly quantity: number;
}
