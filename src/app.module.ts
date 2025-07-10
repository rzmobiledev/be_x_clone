import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { ClerkClientProvider } from 'src/clerk/providers/clerk.client.provider';
import { AuthModule } from './auth/auth.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { NotificationModule } from './notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { ClerkAuthGuard } from './auth/clerk.auth.guard';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    MongodbModule,
    UserModule,
    PostModule,
    NotificationModule,
    CommentModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    ClerkClientProvider,
    AppService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
})
export class AppModule {}
