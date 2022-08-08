import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleError } from './utils/errors';
import * as cookieParser from 'cookie-parser';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(handleError);
  app.use(cookieParser());


  await app.listen(3001);
}
bootstrap();
