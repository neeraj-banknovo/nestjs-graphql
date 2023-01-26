import { Query, Resolver } from '@nestjs/graphql';
import { QUERIES } from '../../../common/constants';

@Resolver()
export class AdminResolver {
  constructor() {}

  @Query(() => String, { name: QUERIES.ADMIN.POKE })
  pokeAdmin(): string {
    return 'hello';
  }
}
