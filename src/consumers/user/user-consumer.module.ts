import { Module } from '@nestjs/common';
import { UpdateUserConsumer } from './update-user.consumer';

const consumers = [UpdateUserConsumer];

@Module({
  imports: [],
  providers: [...consumers],
  exports: [...consumers],
})
export class UserConsumersModule {}
