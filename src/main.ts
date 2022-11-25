import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigKey } from './common/enums';
import { AppConfig } from './config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appConfig = config.get<AppConfig>(ConfigKey.App);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.setGlobalPrefix('/api');
  await app.listen(appConfig.port);
}
bootstrap();
