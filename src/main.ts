import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleError } from './utils/errors';
import * as CookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(handleError);
  app.use(CookieParser());
  await app.listen(3001);
}
bootstrap();
