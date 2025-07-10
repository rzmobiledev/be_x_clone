import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserItem, UserSchema } from 'src/utils/schemas/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { ArcjetGuard } from 'src/arcjet/arcjet.guard';
import { userArcjetProvider } from 'src/arcjet/arcjet.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: UserItem.name, schema: UserSchema }]),
    forwardRef(() => NotificationModule),
  ],
  providers: [UserService, userArcjetProvider, ArcjetGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
