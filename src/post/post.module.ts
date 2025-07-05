import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostItem, PostSchema } from 'src/utils/schemas/post.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostItem.name, schema: PostSchema }]),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
