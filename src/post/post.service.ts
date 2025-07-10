import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CommentItem } from 'src/utils/schemas/comment.model';
import { PostItem } from 'src/utils/schemas/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostItem.name) private readonly postItem: Model<PostItem>,
    private cloudinary: CloudinaryService,
  ) {}

  async getPosts(): Promise<PostItem[]> {
    return this.postItem
      .find()
      .sort({ createdAt: -1 })
      .populate('user', 'userName firstName lastName profilePicture')
      .populate({
        path: 'comment',
        populate: {
          path: 'user',
          select: 'userName firstName lastName profilePicture',
        },
      });
  }

  async findById(id: string): Promise<PostItem | null> {
    return this.postItem.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'userName firstName lastName profilePicture',
      },
    });
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    const result = await this.cloudinary.uploadImage(file);
    return result;
  }

  async findByUserPosts(userId: string) {
    return this.postItem
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username firstName lastName profilePicture')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username firstName lastName profilePicture',
        },
      });
  }

  async create(post: PostItem): Promise<PostItem> {
    const newPost = new this.postItem(post);
    return newPost.save();
  }

  async update(id: string, post: PostItem): Promise<PostItem | null> {
    return this.postItem
      .findOneAndUpdate({ clerkId: id }, post, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.postItem.findOneAndDelete({ id });
  }

  async findByIdAndUpdate(
    postId: string,
    commentId: CommentItem,
  ): Promise<PostItem | null> {
    return this.postItem
      .findByIdAndUpdate(postId, { $push: { comments: commentId } })
      .exec();
  }

  async removeCommentFromPost(post: PostItem, commentId: string) {
    return this.postItem.findByIdAndUpdate(post, {
      $pull: { comments: commentId },
    });
  }
}
