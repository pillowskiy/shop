import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ProductSort {
  HighPrice = 0,
  LowPrice = 1,
  Newest = 2,
  Oldest = 3,
}

export class FilterDto {
  @IsOptional()
  @IsEnum(ProductSort)
  public sort?: ProductSort;

  @IsOptional()
  @IsString()
  public term?: string;
}
