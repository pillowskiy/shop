import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ProductSort {
  HighPrice = 'HIGHT_PRICE',
  LowPrice = 'LOW_PRICE',
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
}

export class FilterDto {
  @ApiProperty({
    example: ProductSort.HighPrice,
    description:
      'Sort method:\n' +
      `\nHIGHT_PRICE,
       \nLOW_PRICE,
       \nNEWEST,
       \nOLDEST,`,
  })
  @IsOptional()
  @IsEnum(ProductSort)
  public sort?: ProductSort;

  @ApiProperty({
    example: 'car',
    description: `Term`,
  })
  @IsOptional()
  @IsString()
  public term?: string;
}
