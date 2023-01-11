import { Module, Provider } from '@nestjs/common';
import { UsersResolver } from './resolver/users.resolver';
import { IUsersService, UsersService } from './service/users.service';

const providers: Provider[] = [
  {
    provide: IUsersService,
    useClass: UsersService,
  },
];

@Module({
  imports: [],
  providers: [UsersResolver, ...providers],
  exports: [],
})
export class UsersModule {}
