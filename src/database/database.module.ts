import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey } from '../common/enums';
import { DatabaseConfig } from '../config/config.interface';
import { ConnectionSource, dataSourceOptions } from './orm.config';
import { RepositoryModule } from './repositories/repository.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const configs = configService.get<DatabaseConfig>(ConfigKey.Db);
        return {
          ...(dataSourceOptions as any),
          ...configs,
          autoLoadEntities: true,
        };
      },
      dataSourceFactory: async () => {
        const dataSource = await ConnectionSource.initialize();
        return dataSource;
      },
    }),
    RepositoryModule,
  ],
})
export class DatabaseModule {}
