import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { FilterDto } from './dto/filter.dto';
import { CommentDto } from './dto/comment.dto';
import { Auth } from '@src/decorators/auth.decorator';
import { User } from '@src/decorators/user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  public getAll(
    @Param('id', ParseIntPipe) userId: number,
    @Query() dto: FilterDto,
  ) {
    return this.commentsService.getAll(userId, dto);
  }

  @Auth()
  @Post('/:id')
  public create(
    @Param('id', ParseIntPipe) userId: number,
    @User('id') authorId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentsService.create(userId, authorId, dto);
  }

  @Auth()
  @Delete(':id')
  public async deleteComment(
    @User() executor: PrismaUser,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentsService.delete(executor, commentId);
  }
}
