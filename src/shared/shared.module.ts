import { Global, Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';

// Add your sharable modules here.
const modules = [ServicesModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
