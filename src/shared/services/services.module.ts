import { Module, Provider } from '@nestjs/common';

const providers: Provider[] = [];

@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class ServicesModule {}
