import { registerAs } from '@nestjs/config';
import { ConfigKey, Environment } from '../../common/enums';
import { AppConfig } from '../config.interface';

export default registerAs(
  ConfigKey.App,
  (): AppConfig => ({
    env:
      Environment[process.env.NODE_ENV as keyof typeof Environment] ||
      'development',
    port: Number(process.env.APP_PORT),
    appName: process.env.APP_NAME,
  }),
);
