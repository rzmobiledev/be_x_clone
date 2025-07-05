import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserItem, UserSchema } from 'src/utils/schemas/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserItem.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
