import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
// import {
//   ArcjetGuard,
//   ArcjetModule,
//   detectBot,
//   fixedWindow,
//   shield,
// } from '@arcjet/nest';
// import getEnv from './utils/commons/get.env';
import { ClerkClientProvider } from 'src/clerk/providers/clerk.client.provider';
import { AuthModule } from './auth/auth.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { NotificationModule } from './notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { ClerkAuthGuard } from './auth/clerk.auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ArcjetModule.forRoot({
    //   isGlobal: true,
    //   key: getEnv('ARCJET_KEY'),
    //   rules: [
    //     // Shield protects your app from common attacks e.g. SQL injection
    //     shield({ mode: 'LIVE' }),
    //     // Create a bot detection rule
    //     detectBot({
    //       mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
    //       // Block all bots except the following
    //       allow: [
    //         'CATEGORY:SEARCH_ENGINE', // Google, Bing, etc
    //         // Uncomment to allow these other common bot categories
    //         // See the full list at https://arcjet.com/bot-list
    //         //"CATEGORY:MONITOR", // Uptime monitoring services
    //         //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
    //       ],
    //     }),
    //     // Create a fixed window rate limit. Other algorithms are supported.
    //     fixedWindow({
    //       mode: 'LIVE',
    //       window: '60s', // 10 second fixed window
    //       max: 2, // Allow a maximum of 2 requests
    //     }),
    //   ],
    // }),
    AuthModule,
    MongodbModule,
    UserModule,
    PostModule,
    NotificationModule,
    CommentModule,
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
