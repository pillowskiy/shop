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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public getCategories() {
    return this.categoryService.getAll();
  }
  @Get('/id/:id')
  public getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryByQuery({ id });
  }
  @Get('/slug/:slug')
  public getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryByQuery({ slug });
  }
  @Roles(Role.Admin)
  @Auth()
  @HttpCode(200)
  @Post('create')
  public createCategory() {
    return this.categoryService.create();
  }
  @Auth()
  @Roles(Role.Admin)
  @HttpCode(200)
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) productId: number) {
    return this.categoryService.delete(productId);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Roles(Role.Admin)
  @HttpCode(200)
  @Put(':id')
  public updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: CategoryDto,
  ) {
    return this.categoryService.update(id, category);
  }
}
