import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentItem } from 'src/utils/schemas/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentItem.name)
    private readonly commentItem: Model<CommentItem>,
  ) {}

  async findAll(): Promise<CommentItem[]> {
    return this.commentItem.find().exec();
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

  async create(comment: CommentItem): Promise<CommentItem> {
    const createdComment = new this.commentItem(comment);
    return createdComment.save();
  }
}
