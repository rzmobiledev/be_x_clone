import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationItem } from 'src/utils/schemas/notification.model';
import { UserItem } from 'src/utils/schemas/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserItem.name)
    private readonly userItem: Model<UserItem>,
    private readonly notification: NotificationService,
  ) {}

  async findAll(): Promise<UserItem[]> {
    return this.userItem.find().exec();
  }

  async findOne(username: string): Promise<UserItem | null> {
    return this.userItem.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserItem | null> {
    return this.userItem.findById({ id }).exec();
  }

  async findByClerkId(clerkId: string): Promise<UserItem | null> {
    return this.userItem.findOne({ clerkId }).exec();
  }

  async create(user: UserItem): Promise<UserItem> {
    const createdUser = new this.userItem(user);
    return createdUser.save();
  }

  async update(user: UserItem): Promise<UserItem | null> {
    return this.userItem
      .findOneAndUpdate({ clerkId: user.clerkId }, user, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.userItem.findOneAndDelete({ clerkId: id }).exec();
  }

  async unfollow(currentUserId: string, targetUserId: string) {
    return this.userItem.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    });
  }

  async following(currentUserId: string, targetUserId: string) {
    return this.userItem.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    });
  }

  async createNotification(
    from: UserItem,
    to: UserItem,
  ): Promise<NotificationItem> {
    return await this.notification.create({
      from,
      to,
      type: 'follow',
    } as NotificationItem);
  }
}
