import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class UserItem extends Document {
  @Prop({ required: true, unique: true })
  clerkId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ default: '' })
  profilePicture: string;

  @Prop({ default: '' })
  bannerImage: string;

  @Prop({ maxlength: 160, default: '' })
  bio: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  followers: [];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  following: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserItem);
