import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { categorySelect } from './prisma.partials';
import slugify from '@src/utils/slugify';
import type { Prisma } from '@prisma/client';
import type { PaginationDto } from '../../dto/pagination.dto';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) {}

  public async getCategoryByQuery(query: Prisma.CategoryWhereUniqueInput) {
    const category = await this.prisma.category.findUnique({
      where: query,
      select: categorySelect,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
  public async delete(categoryId: number) {
    const category = await this.getCategoryByQuery({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Cannot find category with id ${categoryId}`);
    }
    return this.prisma.category.delete({
      where: { id: categoryId },
      select: categorySelect,
    });
  }
  public getAll(dto: PaginationDto) {
    const { skip, perPage } = this.pagination.getPagination(dto);

    return this.prisma.category.findMany({
      select: categorySelect,
      skip,
      take: perPage,
    });
  }
  public create() {
    return this.prisma.category.create({
      data: { name: '', slug: '' },
      select: categorySelect,
    });
  }
  public update(categoryId: number, { name }: CategoryDto) {
    return this.prisma.category.update({
      where: { id: categoryId },
      select: categorySelect,
      data: { name, slug: slugify(name) },
    });
  }
}
