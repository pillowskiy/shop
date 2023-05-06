import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  public getPagination(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    return { perPage, skip };
  }
}
