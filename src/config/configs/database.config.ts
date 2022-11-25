import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../../common/enums';
import { DatabaseConfig } from '../config.interface';

export default registerAs(
  ConfigKey.Db,
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  }),
);
