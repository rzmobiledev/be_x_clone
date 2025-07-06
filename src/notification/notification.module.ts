import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationItem,
  NotificationSchema,
} from 'src/utils/schemas/notification.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationItem.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
