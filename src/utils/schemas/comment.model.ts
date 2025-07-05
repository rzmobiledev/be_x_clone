import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserItem } from './user.model';
import { PostItem } from './post.model';

@Schema()
export class CommentItem extends Document {
  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: UserItem;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: PostItem;

  @Prop({ required: true, maxlength: 280 })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  likes: [UserItem];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(CommentItem);
