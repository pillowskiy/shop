import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../dto/pagination.dto';

@Injectable()
export class PaginationService {
  public getPagination({ page = 1, perPage = 10 }: PaginationDto) {
    const skip = (page - 1) * perPage;
    return { perPage, skip };
  }
}
