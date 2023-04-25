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
import { Roles, Role } from 'src/decorators/roles.decorator';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryResponseType } from './category.swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ status: 200, type: [CategoryResponseType] })
  @Get()
  public getCategories() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ status: 200, type: CategoryResponseType })
  @Get('/id/:id')
  public getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryByQuery({ id });
  }

  @ApiOperation({ summary: 'Get category by slug' })
  @ApiParam({ name: 'slug', type: 'string' })
  @ApiOkResponse({ status: 200, type: CategoryResponseType })
  @Get('/slug/:slug')
  public getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryByQuery({ slug });
  }

  @ApiOperation({ summary: 'Create category (only for admins)' })
  @ApiOkResponse({
    status: 200,
    schema: {
      type: 'Object',
      example: {
        id: 1,
        name: '',
        slug: '',
      },
    },
  })
  @Roles(Role.Admin)
  @Auth()
  @HttpCode(200)
  @Post('create')
  public createCategory() {
    return this.categoryService.create();
  }

  @ApiOperation({ summary: 'Delete category by id (only for admins)' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ status: 200, type: CategoryResponseType })
  @Auth()
  @Roles(Role.Admin)
  @HttpCode(200)
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) productId: number) {
    return this.categoryService.delete(productId);
  }

  @ApiOperation({ summary: 'Update category by id (only for admins)' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ status: 200, type: CategoryResponseType })
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
