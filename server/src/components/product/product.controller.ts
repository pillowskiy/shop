import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'node:path';
import { UploadHelper } from '../../utils/UploadHelper';
import { diskStorage } from 'multer';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation(product.getAll.operation)
  @ApiResponse(product.getAll.response)
  @ApiQuery({ type: FilterDto })
  @Get()
  public async getProducts(@Query() dto: FilterDto) {
    return this.productService.getProducts(dto);
  }

  @ApiOperation(product.getAll.operation)
  @ApiResponse(product.getAll.response)
  @ApiQuery({ type: FilterDto })
  @Get('/users/:id')
  public async getUserProducts(
    @Param('id', ParseIntPipe) userId: number,
    @Query() dto: FilterDto,
  ) {
    return this.productService.getProducts(dto, { userId });
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

  @ApiOperation(product.update.operation)
  @ApiResponse(product.update.response)
  @ApiParam(product.update.param)
  @ApiBody({ type: ProductDto })
  @Auth()
  @HttpCode(200)
  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('files[]', 10, {
      fileFilter: UploadHelper.fileFilter,
      storage: diskStorage({
        destination: UploadHelper.destinationPath,
        filename: UploadHelper.customFileName,
      }),
    }),
  )
  public async upsertProduct(
    @Param('id', ParseIntPipe) productId: number,
    @User() user: PrismaUser,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Body() dto: ProductDto,
  ) {
    const filePaths = files.map(
      (file) => `http://localhost:8080/products/images/${file.filename}`,
    );
    console.log(filePaths);
    return this.productService.upsert({
      productId,
      user,
      dto: { ...dto, images: [...dto.images, ...filePaths] },
    });
  }

  @ApiOperation(product.delete.operation)
  @ApiResponse(product.delete.response)
  @ApiParam(product.delete.param)
  @Auth()
  @HttpCode(200)
  @Delete(':id')
  public async deleteProduct(
    @User() user: PrismaUser,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.delete(user, productId);
  }

  @Get('/images/:name')
  public async getImage(
    @Param('name') imageName: string,
    @Res() res: Response,
  ) {
    return res.sendFile(join(process.cwd(), 'uploads/', imageName));
  }
}
