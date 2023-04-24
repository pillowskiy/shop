import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterDto } from './dto/filter.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { ProductDto } from './dto/product.dto';
import { User } from 'src/decorators/user.decorator';
import type { User as PrismaUser } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  public async getProducts(@Query() dto: FilterDto) {
    return this.productService.getProducts(dto);
  }

  @Get('/id/:id')
  public async getProductById(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
  }

  @Get('/slug/:slug')
  public async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getProductByQuery({ slug });
  }

  @Get('/category/:slug')
  public async getProductByCategory(@Param('slug') categorySlug: string) {
    return this.productService.getByCategory(categorySlug);
  }

  @Get('/similar/:id')
  public async getSimilar(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getSimilar(productId);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post()
  public async createProduct(@User('id') userId: string) {
    return this.productService.create(+userId);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put(':id')
  public async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @User() user: PrismaUser,
    @Body() dto: ProductDto,
  ) {
    return this.productService.update(productId, user, dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Delete(':id')
  public async deleteProduct(
    @User() user: PrismaUser,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.delete(user, productId);
  }
}
