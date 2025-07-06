import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getEnv from './utils/commons/get.env';
import { HttpExceptionHandler } from './utils/commons/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionHandler());
  await app.listen(getEnv('PORT', '3000'));
}
void bootstrap();
