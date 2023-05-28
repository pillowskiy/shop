import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put, Query,
  UsePipes,
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Roles, Role } from 'src/decorators/roles.decorator';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { category } from 'src/config/docs';
import { PaginationDto } from '../../dto/pagination.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation(category.all.operation)
  @ApiOkResponse(category.all.response)
  @Get()
  public getCategories(@Query() dto: PaginationDto) {
    return this.categoryService.getAll(dto);
  }

  @ApiOperation(category.byId.operation)
  @ApiParam(category.byId.param)
  @ApiOkResponse(category.byId.response)
  @Get('/id/:id')
  public getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryByQuery({ id });
  }

  @ApiOperation(category.bySlug.operation)
  @ApiParam(category.bySlug.param)
  @ApiOkResponse(category.bySlug.response)
  @Get('/slug/:slug')
  public getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryByQuery({ slug });
  }

  @ApiOperation(category.create.operation)
  @ApiOkResponse(category.create.response)
  @Roles(Role.Admin)
  @Auth()
  @HttpCode(200)
  @Post('create')
  public createCategory() {
    return this.categoryService.create();
  }

  @ApiOperation(category.delete.operation)
  @ApiParam(category.delete.param)
  @ApiOkResponse(category.delete.response)
  @Auth()
  @Roles(Role.Admin)
  @HttpCode(200)
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) productId: number) {
    return this.categoryService.delete(productId);
  }

  @ApiOperation(category.update.operation)
  @ApiParam(category.update.param)
  @ApiBody({ type: CategoryDto })
  @ApiOkResponse(category.update.response)
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
