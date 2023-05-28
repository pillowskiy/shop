import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { product } from 'src/config/docs/swagger.entity';

export class ProductDto {
  @ApiProperty({
    example: 'Toy Car',
    description: 'The product name',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  public name: string;

  @ApiProperty({
    example: product.price,
    description: 'The product price',
  })
  @IsPositive()
  @IsNumber()
  public price: number;

  @ApiProperty({
    example: product.quantity,
    description: 'The product quantity',
  })
  @IsPositive()
  @IsNumber()
  public quantity: number;

  @ApiProperty({
    example: product.description,
    description: 'The product description (optional)',
  })
  @IsString()
  public description: string;

  @ApiProperty({
    example: product.images,
    description: 'The product images',
  })
  @IsString({ each: true })
  @ArrayMinSize(1)
  public images: string[];

  @ApiProperty({
    example: product.images,
    description: 'The product category id',
  })
  @IsNumber()
  public categoryId: number;
}
