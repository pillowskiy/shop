import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { product } from 'src/config/docs/swagger.entity';
import { Transform, Type } from 'class-transformer';

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
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  public price: number;

  @ApiProperty({
    example: product.quantity,
    description: 'The product quantity',
  })
  @Type(() => Number)
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
  @Transform(({ value }) => value.toString().split(','))
  @IsString({ each: true })
  public images: string[];

  @ApiProperty({
    example: [1],
    description: 'The product categories id',
  })
  @Transform(({ value }) =>
    value
      .toString()
      .split(',')
      .map((newValue) => +newValue),
  )
  @IsNumber({}, { each: true })
  public categories: number[];
}
