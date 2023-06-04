import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma, User as PrismaUser } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { productFullestSelect, productSelect } from './prisma.partials';
import { ProductDto } from './dto/product.dto';
import slugify from 'src/utils/slugify';
import { FilterDto, ProductSort } from './dto/filter.dto';
import { PaginationService } from 'src/components/pagination/pagination.service';
import { CategoryService } from 'src/components/category/category.service';
import { matchRoles } from 'src/utils/Util';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
    private readonly categoryService: CategoryService,
    private readonly uploadService: UploadService,
  ) {}

  public async getProducts(dto: FilterDto, where?: Prisma.ProductWhereInput) {
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];
    switch (dto.sort) {
      case ProductSort.HighPrice:
        prismaSort.push({ price: 'desc' });
        break;
      case ProductSort.LowPrice:
        prismaSort.push({ price: 'asc' });
        break;
      case ProductSort.Oldest:
        prismaSort.push({ createdAt: 'asc' });
        break;
      case ProductSort.Popular:
        prismaSort.push({ sold: 'desc' });
        break;
      case ProductSort.Rated:
        prismaSort.push({ reviews: { _count: 'desc' } });
        break;
      default:
        prismaSort.push({ createdAt: 'desc' });
    }

    const prismaTermSort: Prisma.ProductWhereInput = dto.term
      ? {
          OR: [
            { name: { contains: dto.term, mode: 'insensitive' } },
            { description: { contains: dto.term, mode: 'insensitive' } },
          ],
        }
      : {};

    const { skip, perPage } = this.pagination.getPagination(dto);
    const whereInput: Prisma.ProductWhereInput = {
      ...prismaTermSort,
      ...where,
      quantity: { gt: 0 },
    };

    const products = await this.prisma.product.findMany({
      where: whereInput,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: productFullestSelect,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: whereInput,
      }),
    };
  }
  public async getProductById(productId: number) {
    return this.getProductByQuery({ id: productId }, productFullestSelect);
  }
  public async getProductByQuery(
    query: Prisma.ProductWhereUniqueInput,
    select: Prisma.ProductSelect = productFullestSelect,
  ) {
    const product = await this.prisma.product.findUnique({
      where: query,
      select,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
  public async getByCategory(categorySlug: string) {
    return this.prisma.product.findMany({
      where: {
        categories: {
          some: { slug: categorySlug },
        },
      },
      select: productSelect,
    });
  }
  public async getSimilar(productId: number) {
    const product = await this.getProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!product.categories.length) return [];

    return this.prisma.product.findMany({
      where: {
        categories: {
          some: { name: product.categories[0].name },
        },
        id: {
          not: productId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: productSelect,
    });
  }
  public async upsert({
    productId,
    user,
    dto,
    files,
    serverUrl,
  }: {
    // TEMP
    productId: number;
    user: PrismaUser;
    dto: ProductDto;
    files: Express.Multer.File[];
    serverUrl: string;
  }) {
    const { categories, ...data } = dto;
    const categoriesData = await this.prisma.category.findMany({
      where: { id: { in: categories } },
    });

    const product = await this.getProductByQuery(
      { id: productId },
      { ownerId: true, images: true },
    ).catch(() => null);

    if (
      product &&
      user.id !== product.ownerId &&
      !matchRoles(['Admin'], user.roles)
    ) {
      throw new ForbiddenException('You are not allowed to do this action');
    }

    const uploadData = await this.uploadService.uploadFiles(files);
    const imagesURLs = uploadData.map(({ fileName, fileExtension }) => {
      return `${serverUrl}/uploads/${fileName + fileExtension}`;
    });

    await this.uploadService.unlinkFromPaths(
      product?.images.filter((image) => dto.images.indexOf(image) === -1) || [],
    );

    const disconnectCategories = categoriesData
      .filter(({ id }) => categories.indexOf(id) === -1)
      .map(({ id }) => ({ id }));

    // TEMP: 03.06 17:03
    const images = [...dto.images.filter(Boolean), ...imagesURLs];

    if (!images.length) {
      throw new BadRequestException({
        errors: {
          images: 'No images have been validated',
        },
      });
    }

    const updateProductData = {
      ...data,
      slug: slugify(data.name),
      categories: {
        connect: categoriesData.map(({ id }) => ({ id })),
        // https://github.com/prisma/prisma-client-js/issues/377
        disconnect: disconnectCategories.length
          ? disconnectCategories
          : undefined,
      },
      images,
    };

    return this.prisma.product
      .upsert({
        where: { id: productId },
        update: updateProductData,
        create: {
          ...updateProductData,
          sold: 0,
          ownerId: user.id,
        },
        select: productFullestSelect,
      })
      .catch((err) => {
        this.uploadService.unlinkFromPaths(imagesURLs);
        throw err;
      });
  }

  public async delete(executor: PrismaUser, productId: number) {
    const product = await this.getProductById(productId);
    if (!product) {
      throw new NotFoundException(`Cannot find product with id ${productId}`);
    }
    if (
      product.ownerId !== executor.id &&
      matchRoles(['Admin'], executor.roles)
    ) {
      throw new ForbiddenException('You are not allowed to do this action');
    }
    return this.prisma.product
      .delete({
        where: { id: productId },
      })
      .then((res) => {
        this.uploadService.unlinkFromPaths(res.images);
        return res;
      });
  }
}
