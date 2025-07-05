import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getEnv from './utils/commons/get.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(getEnv('PORT', '3000'));
}
void bootstrap();
