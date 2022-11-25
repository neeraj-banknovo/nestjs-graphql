import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { repositories } from '.';
import { entities } from '../entities';
import { DbTransactionFactory } from '../transaction.factory';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  providers: [...repositories, DbTransactionFactory],
  exports: [...repositories, DbTransactionFactory],
})
export class RepositoryModule {}
