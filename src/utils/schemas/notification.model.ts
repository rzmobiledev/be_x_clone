import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserItem } from './user.model';
import { PostItem } from './post.model';
import { CommentItem } from './comment.model';

@Schema()
export class NotificationItem extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  from: UserItem;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  to: UserItem;

  @Prop({ required: true, enum: ['follow', 'like', 'comment'] })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null })
  post: PostItem;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null })
  comment: CommentItem;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationItem);
