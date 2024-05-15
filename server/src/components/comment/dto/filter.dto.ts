import { PaginationDto } from '../../../dto/pagination.dto';
import { IsEnum } from 'class-validator';

export enum CommentSort {
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
}

export class FilterDto extends PaginationDto {
  @IsEnum(CommentSort)
  public readonly sort?: CommentSort;
}
