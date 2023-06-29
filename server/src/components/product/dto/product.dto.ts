import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { product } from 'src/config/docs/swagger.entity';
import { Transform, Type } from 'class-transformer';

export class ProductDto {
  @ApiProperty({
    example: 'Toy Car',
    description: 'The product name',
  })
  @IsString({ message: 'String exptected' })
  @MaxLength(64, {
    message: 'The product name should not exceed 64 characters',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly name: string;

  @ApiProperty({
    example: product.price,
    description: 'The product price',
  })
  @Type(() => Number)
  @IsPositive({
    message: 'The discount percentage should be a positive number',
  })
  @IsNumber({}, { message: 'Number expected' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly price: number;

  @Type(() => Number)
  @Max(99, { message: 'The discount percentage cannot exceed 99%' })
  @Min(0, {
    message: 'The discount percentage should be a positive number',
  })
  @IsNumber({}, { message: 'Number expected' })
  @IsOptional()
  public readonly discountPercent?: number = 0;

  @ApiProperty({
    example: product.quantity,
    description: 'The product quantity',
  })
  @Type(() => Number)
  @IsPositive({ message: 'The quantity must be an positive integer value' })
  @IsInt({ message: 'The quantity must be an positive integer value' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly quantity: number;

  @ApiProperty({
    example: product.description,
    description: 'The product description',
  })
  @IsString({ message: 'String expected' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly description: string;

  @ApiProperty({
    example: product.images,
    description: 'The product images',
  })
  @Transform(({ value }) => value.toString().split(','))
  @IsString({ each: true })
  public readonly images: string[];

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
  public readonly categories: number[];
}
