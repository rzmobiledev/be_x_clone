import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, CommentItem } from 'src/utils/schemas/comment.model';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentItem.name, schema: CommentSchema, collection: ' ' },
    ]),
    UserModule,
    PostModule,
    NotificationModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
