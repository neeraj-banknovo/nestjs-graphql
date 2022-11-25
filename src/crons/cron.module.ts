import { Module, Provider } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CardCronHandler } from './card.cron';

/*
    CRON_JOBS is a collection of all cron jobs to be executed in system
 */
const CRON_JOBS: Provider[] = [CardCronHandler];

/*
    CRON_JOB_DEPS is a collection of all cron jobs dependencies.
    Add your dependencies as required
 */
const CRON_JOB_DEPS = [ScheduleModule.forRoot()];

@Module({
  imports: [...CRON_JOB_DEPS],
  providers: [...CRON_JOBS],
  exports: [...CRON_JOBS],
})
export class CronModule {}
