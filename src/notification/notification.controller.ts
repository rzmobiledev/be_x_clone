import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationItem } from 'src/utils/schemas/notification.model';
import { TReqUser } from 'src/utils/commons/express.http.schema';

import { Response } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notification: NotificationService) {}

  @Get()
  async findAll(): Promise<NotificationItem[]> {
    return this.notification.findAll();
  }

  @Post()
  async getNotifications(@Req() req: TReqUser, @Res() res: Response) {
    const user = await this.notification.userFindClerkById(req.id);
    if (!user) {
      throw new Error('User not found');
    }
    const notifications = await this.notification.findOne(user._id as string);
    res.status(HttpStatus.OK).json(notifications);
  }

  @Delete(':notifId')
  async deleteNotification(
    @Req() req: TReqUser,
    @Res() res: Response,
    @Param('notifId') notifId: string,
  ) {
    const user = await this.notification.userFindClerkById(req.id);
    if (!user)
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
    const notifications = await this.notification.delete(
      notifId,
      user._id as string,
    );
    if (!notifications)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Notification not found' });

    res
      .status(HttpStatus.OK)
      .json({ message: 'Notification deleted successfully' });
  }
}
