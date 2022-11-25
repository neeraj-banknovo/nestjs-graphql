/* eslint-disable prettier/prettier */
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import { Environment } from '../common/enums';

export const configurations = [
  appConfig,
  databaseConfig,
];

export const configMethods = {
  isLocalEnv: (): boolean => process.env.NODE_ENV === Environment.Local,
  isDevelopmentEnv: (): boolean => process.env.NODE_ENV === Environment.Development,
  isProductionEnv: (): boolean => process.env.NODE_ENV === Environment.Production,
  isTestEnv: (): boolean => process.env.NODE_ENV === Environment.Testing,
  isStagingEnv: (): boolean => process.env.NODE_ENV === Environment.Staging,
}
