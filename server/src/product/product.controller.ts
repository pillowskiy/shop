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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { product } from 'src/config/docs';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation(product.getAll.operation)
  @ApiResponse(product.getAll.response)
  @ApiQuery({ type: FilterDto })
  @UsePipes(new ValidationPipe())
  @Get()
  public async getProducts(@Query() dto: FilterDto) {
    return this.productService.getProducts(dto);
  }

  @ApiOperation(product.byId.operation)
  @ApiResponse(product.byId.response)
  @ApiParam(product.byId.param)
  @Get('/id/:id')
  public async getProductById(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
  }

  @ApiOperation(product.bySlug.operation)
  @ApiResponse(product.bySlug.response)
  @ApiParam(product.bySlug.param)
  @Get('/slug/:slug')
  public async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getProductByQuery({ slug });
  }

  @ApiOperation(product.byCategorySlug.operation)
  @ApiResponse(product.byCategorySlug.response)
  @ApiParam(product.byCategorySlug.param)
  @Get('/category/:slug')
  public async getProductByCategory(@Param('slug') categorySlug: string) {
    return this.productService.getByCategory(categorySlug);
  }

  @ApiOperation(product.similar.operation)
  @ApiResponse(product.similar.response)
  @ApiParam(product.similar.param)
  @Get('/similar/:id')
  public async getSimilar(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getSimilar(productId);
  }

  @ApiOperation(product.create.operation)
  @ApiResponse(product.create.response)
  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post()
  public async createProduct(@User('id') userId: string) {
    return this.productService.create(+userId);
  }

  @ApiOperation(product.update.operation)
  @ApiResponse(product.update.response)
  @ApiParam(product.update.param)
  @ApiBody({ type: ProductDto })
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

  @ApiOperation(product.delete.operation)
  @ApiResponse(product.delete.response)
  @ApiParam(product.delete.param)
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
