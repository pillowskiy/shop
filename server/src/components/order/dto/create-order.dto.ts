import {
  ArrayMinSize,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  public readonly items: OrderItemDto[];

  @IsInt()
  @Min(0)
  public readonly shippingId: number;
}

export class OrderItemDto {
  @IsInt()
  @Min(0)
  public readonly productId: number;

  @IsInt()
  @Min(1)
  public readonly quantity: number;
}
