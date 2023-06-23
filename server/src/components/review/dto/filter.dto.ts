import { PaginationDto } from '../../../dto/pagination.dto';
import { IsEnum } from 'class-validator';

export enum ReviewSort {
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
  Better = 'BETTER',
  Worse = 'WORSE',
}

export class FilterDto extends PaginationDto {
  @IsEnum(ReviewSort)
  public readonly sort?: ReviewSort;
}
