import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserItem, UserSchema } from 'src/utils/schemas/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserItem.name, schema: UserSchema }]),
    NotificationModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
