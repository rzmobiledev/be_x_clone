import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentItem } from 'src/utils/schemas/comment.model';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<CommentItem[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentItem | null> {
    return this.commentService.findOne(id);
  }

  @Post()
  async create(@Body() commentItem: CommentItem) {
    return this.commentService.create(commentItem);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() commentItem: CommentItem) {
    return this.commentService.update(id, commentItem);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
