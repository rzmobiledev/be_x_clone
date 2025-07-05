import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserItem } from 'src/utils/schemas/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserItem.name) private readonly userItem: Model<UserItem>,
  ) {}

  async findAll(): Promise<UserItem[]> {
    return this.userItem.find().exec();
  }

  async findOne(username: string): Promise<UserItem | null> {
    return this.userItem.findOne({ username }).exec();
  }

  async create(user: UserItem): Promise<UserItem> {
    const createdUser = new this.userItem(user);
    return createdUser.save();
  }

  async update(id: string, user: UserItem): Promise<UserItem | null> {
    return this.userItem.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string) {
    return this.userItem.findByIdAndDelete(id).exec();
  }
}
