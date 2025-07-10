import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentItem } from 'src/utils/schemas/comment.model';
import { TReqUser } from 'src/utils/commons/express.http.schema';
import { Response } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentService.getComments(String(postId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentItem | null> {
    return this.commentService.findOne(id);
  }

  @Post()
  async createComment(
    @Res() res: Response,
    @Req() req: TReqUser,
    @Body() content: string,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    if (!content || content.trim() === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Comment content is required' });
    }
    const user = await this.commentService.userfindByClerkId(req.id);
    const post = await this.commentService.findPostById(String(postId));

    if (!user || !post)
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });

    const comment = await this.commentService.createComment({
      user: user,
      post: post,
      content,
    } as CommentItem);

    // link the comment tho the post
    await this.commentService.postFindById(String(postId), comment);

    // create notification if not commenting on own post
    if ((post.user as unknown as string) !== (user._id as string)) {
      await this.commentService.createNotification(user, post, comment);
    }
    res.status(HttpStatus.CREATED).json(comment);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() commentItem: CommentItem) {
    return this.commentService.update(id, commentItem);
  }

  @Delete(':commentId ')
  async deleteComment(
    @Res() res: Response,
    @Req() req: TReqUser,
    @Param('commentId ') commentId: string,
  ) {
    const user = await this.commentService.userfindByClerkId(req.id);
    const comment = await this.commentService.findOne(commentId);

    if (!user || !comment) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'User or comment not found!' });
    }

    if ((comment.user as unknown as string) !== (user._id as string)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: 'You can only delete your own comment' });
    }
    // remove comment from post
    await this.commentService.removeCommentFromPost(comment.post, commentId);
    await this.commentService.delete(commentId);
    res.status(HttpStatus.OK).json({ message: 'Comment deleted successfully' });
  }
}
