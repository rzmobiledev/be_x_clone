import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { CommentItem } from 'src/utils/schemas/comment.model';
import { NotificationItem } from 'src/utils/schemas/notification.model';
import { PostItem } from 'src/utils/schemas/post.model';
import { UserItem } from 'src/utils/schemas/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentItem.name)
    private readonly commentItem: Model<CommentItem>,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
  ) {}

  async getComments(postId: string): Promise<CommentItem[]> {
    return this.commentItem
      .find({ post: postId })
      .sort({ createdAt: -1 })
      .populate('user', 'username firstName lastName profilePicture');
  }

  async findOne(id: string): Promise<CommentItem | null> {
    return this.commentItem.findById(id);
  }

  async delete(id: string) {
    return this.commentItem.findByIdAndDelete(id);
  }

  async update(id: string, comment: CommentItem): Promise<CommentItem | null> {
    return this.commentItem.findByIdAndUpdate(id, comment, {
      new: true,
    });
  }

  async createComment(comment: CommentItem): Promise<CommentItem> {
    const createdComment = new this.commentItem(comment);
    return createdComment.save();
  }

  async userfindByClerkId(clerkId: string): Promise<UserItem | null> {
    return this.userService.findByClerkId(clerkId);
  }

  async findPostById(postId: string): Promise<PostItem | null> {
    return this.postService.findById(postId);
  }

  async createNotification(
    user: UserItem,
    post: PostItem,
    comment: CommentItem,
  ): Promise<NotificationItem> {
    return await this.notificationService.create({
      from: user._id,
      to: post.user,
      post: post._id,
      comment: comment._id,
    } as NotificationItem);
  }

  async removeCommentFromPost(PostItem: PostItem, commentId: string) {
    return await this.postService.removeCommentFromPost(PostItem, commentId);
  }

  async postFindById(
    postId: string,
    comment: CommentItem,
  ): Promise<PostItem | null> {
    return await this.postService.findByIdAndUpdate(String(postId), comment);
  }
}
