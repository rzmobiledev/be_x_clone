import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostItem } from 'src/utils/schemas/post.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostItem[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostItem | null> {
    return await this.postService.findOne(id);
  }

  @Post()
  async create(@Body() post: PostItem): Promise<PostItem | null> {
    return await this.postService.create(post);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    post: PostItem,
  ): Promise<PostItem | null> {
    return await this.postService.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PostItem | null> {
    return await this.postService.delete(id);
  }
}
