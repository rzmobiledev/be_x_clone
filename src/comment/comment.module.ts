import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, CommentItem } from 'src/utils/schemas/comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentItem.name, schema: CommentSchema, collection: ' ' },
    ]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
