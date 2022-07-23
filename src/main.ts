import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'express-async-errors';
import {handleError} from "./utils/errors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(handleError)
  await app.listen(3001);
}
bootstrap();
