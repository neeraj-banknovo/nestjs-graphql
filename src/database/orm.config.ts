import { config } from 'dotenv';
config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { configMethods } from '../config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  migrationsTableName: 'migrations',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/entities/*{.ts,.js}'],
  migrations: ['dist/data-source/migrations/*{.ts,.js}'],
  logging: configMethods.isLocalEnv(),
};

export const ConnectionSource = new DataSource(dataSourceOptions);
