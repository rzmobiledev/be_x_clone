import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationItem } from 'src/utils/schemas/notification.model';
import { UserService } from 'src/user/user.service';
import { UserItem } from 'src/utils/schemas/user.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationItem.name)
    private readonly notificationService: Model<NotificationItem>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<NotificationItem[]> {
    return this.notificationService.find().exec();
  }

  async findOne(id: string): Promise<NotificationItem | null> {
    return this.notificationService
      .findOne({ to: id })
      .sort({ createdAt: -1 })
      .populate('from', 'userName firstName lastName profilePicture')
      .populate('post', 'content image')
      .populate('comment', 'content');
  }

  async update(
    id: string,
    notif: NotificationItem,
  ): Promise<NotificationItem | null> {
    return this.notificationService
      .findOneAndUpdate({ id }, notif, { new: true })
      .exec();
  }

  async create(notif: NotificationItem): Promise<NotificationItem> {
    const created = new this.notificationService(notif);
    return created.save();
  }

  async delete(notifId: string, userId: string) {
    return this.notificationService
      .findOneAndDelete({ _id: notifId, to: userId })
      .exec();
  }

  async userFindClerkById(clerkId: string): Promise<UserItem | null> {
    return await this.userService.findByClerkId(clerkId);
  }
}
