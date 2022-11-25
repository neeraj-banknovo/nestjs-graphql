import { Module } from '@nestjs/common';
import { UsersResolver } from './resolver/users.resolver';
import { UsersService } from './service/users.service';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
