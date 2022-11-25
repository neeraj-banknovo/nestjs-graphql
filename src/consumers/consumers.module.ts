import { Module } from '@nestjs/common';
import { UserConsumersModule } from './user/user-consumer.module';

/*
    consumerModules is a collection of all consumers to be executed in system
 */
const consumerModules = [UserConsumersModule];

@Module({
  imports: [...consumerModules],
  providers: [],
  exports: [],
})
export class ConsumersModule {}
