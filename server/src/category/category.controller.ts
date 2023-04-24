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
  @Post('create')
  @Auth()
  @HttpCode(200)
  public createCategory() {
    return this.categoryService.create();
  }
  @Delete(':id')
  @Auth()
  @HttpCode(200)
  public deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  public updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: CategoryDto,
  ) {
    return this.categoryService.update(id, category);
  }
}
