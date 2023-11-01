import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaginationDto } from '@src/dto/pagination.dto';
import { Transform } from 'class-transformer';

export enum ProductSort {
  HighPrice = 'HIGHT_PRICE',
  LowPrice = 'LOW_PRICE',
  Newest = 'NEWEST',
  Popular = 'POPULAR',
  Rated = 'RATED',
  Oldest = 'OLDEST',
}

export class FilterDto extends PaginationDto {
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
  public readonly sort?: ProductSort;

  @ApiProperty({
    example: 'car',
    description: `Term`,
  })
  @IsString({ message: 'String expected' })
  @IsOptional()
  public readonly term?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Transform((params) => params.value.split(',').map(Number))
  @IsOptional()
  public readonly ids?: number[];
}
