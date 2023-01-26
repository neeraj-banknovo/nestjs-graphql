import { Module } from '@nestjs/common';
import { AdminResolver } from './resolver/admin.resolver';

@Module({
  imports: [],
  providers: [AdminResolver],
  exports: [],
})
export class AdminModule {}
