import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationItem } from 'src/utils/schemas/notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationItem.name)
    private readonly notificationService: Model<NotificationItem>,
  ) {}

  async findAll(): Promise<NotificationItem[]> {
    return this.notificationService.find().exec();
  }

  async findOne(id: string): Promise<NotificationItem | null> {
    return this.notificationService.findById(id).exec();
  }

  async update(
    id: string,
    notif: NotificationItem,
  ): Promise<NotificationItem | null> {
    return this.notificationService
      .findByIdAndUpdate(id, notif, { new: true })
      .exec();
  }

  async create(notif: NotificationItem): Promise<NotificationItem> {
    const created = new this.notificationService(notif);
    return created.save();
  }

  async delete(id: string) {
    return this.notificationService.findByIdAndDelete(id).exec();
  }
}
