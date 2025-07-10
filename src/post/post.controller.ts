import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostItem } from 'src/utils/schemas/post.model';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TReqUser } from 'src/utils/commons/express.http.schema';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getPosts(): Promise<PostItem[]> {
    return await this.postService.getPosts();
  }

  @Get(':id')
  async getUserPosts(
    @Res() res: Response,
    @Param('username') username: string,
  ) {
    const user = await this.userService.findOne(username);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return await this.postService.findByUserPosts(user._id as string);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Req() req: TReqUser,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Body() content: string,
  ) {
    if (!content && !file) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Post must contain either text or image' });
    }

    const user = await this.userService.findOne(req.username as string);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
    }

    const uploadResponse = await this.postService.uploadImageToCloudinary(file);
    if (!uploadResponse || !uploadResponse.secure_url) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Image upload failed' });
    }
    const imageUrl = uploadResponse.secure_url as string;
    const post = this.postService.create({
      content,
      user: user,
      image: imageUrl,
    } as PostItem);

    res.status(HttpStatus.CREATED).json(post);
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
