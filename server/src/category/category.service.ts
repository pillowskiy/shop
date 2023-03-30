import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { categorySelect } from './prisma.partials';
import slugify from 'src/utils/slugify';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

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
    await this.getCategoryByQuery({ id: categoryId });
    return this.prisma.category.delete({
      where: { id: categoryId },
      select: categorySelect,
    });
  }
  public getAll() {
    return this.prisma.category.findMany({
      select: categorySelect,
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
