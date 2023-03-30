import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { categorySelect } from './prisma.partials';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getCategoryById(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: categorySelect,
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return category;
  }
}
