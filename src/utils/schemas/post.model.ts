import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserItem } from './user.model';

@Schema()
export class PostItem extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: UserItem;

  @Prop({ maxlength: 280 })
  content: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  likes: [];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comments: [];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostItem);
