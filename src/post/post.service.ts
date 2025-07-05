import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostItem } from 'src/utils/schemas/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostItem.name) private readonly postItem: Model<PostItem>,
  ) {}

  async findAll(): Promise<PostItem[]> {
    return this.postItem.find().exec();
  }

  async findOne(id: string): Promise<PostItem | null> {
    return this.postItem.findById(id).exec();
  }

  async create(post: PostItem): Promise<PostItem> {
    const newPost = new this.postItem(post);
    return newPost.save();
  }

  async update(id: string, post: PostItem): Promise<PostItem | null> {
    return this.postItem.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async delete(id: string) {
    return this.postItem.findByIdAndDelete(id);
  }
}
