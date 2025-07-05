import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import getEnv from 'src/utils/commons/get.env';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getEnv('MONGODB_URL')),
  ],
})
export class MongodbModule {}
