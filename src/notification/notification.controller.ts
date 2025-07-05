import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationItem } from 'src/utils/schemas/notification.model';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notification: NotificationService) {}

  @Get()
  async findAll(): Promise<NotificationItem[]> {
    return this.notification.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NotificationItem | null> {
    return this.notification.findOne(id);
  }

  @Post()
  async create(@Body() notif: NotificationItem) {
    return this.notification.create(notif);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() notif: NotificationItem) {
    return this.notification.update(id, notif);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notification.delete(id);
  }
}
