import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @IsInt()
  public readonly page?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @IsInt()
  public readonly perPage?: number;
}
