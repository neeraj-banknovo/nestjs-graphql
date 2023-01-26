import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './config/config.module';
import { ConsumersModule } from './consumers/consumers.module';
import { CronModule } from './crons/cron.module';
import { DatabaseModule } from './database/database.module';
import { GraphQlModule } from './graphql/graphql.module';
import { HealthCheckModule } from './health-check/health.check.module';
import { AdminModule } from './modules/admin/admin.module';
import { FeaturesModule } from './modules/features.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    /* This module loads config from environment and registers into the app  */
    ConfigsModule,

    /* This module registers the crons in the app */
    CronModule,

    /* Application feature modules */
    FeaturesModule,

    /* Admin module to be used in multiple endpoints */
    AdminModule,

    /* This modules registers the graphql and the endpoints */
    GraphQlModule,

    /* This registers all the consumers in the app */
    ConsumersModule,

    /* This module list and registers all the modules that needs to be shared across the app */
    SharedModule,

    /* Heath-terminus module */
    HealthCheckModule,

    /* Database module */
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  /* 
    These are the NestJs Lifecycle hooks, and can be plugged in any module, if required.
   */
  onModuleInit() {} // do init work when the module initiated
  onModuleDestroy() {} // do clean up work when the module gets destroyed
}
