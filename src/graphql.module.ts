import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { modules } from './modules';
import { CardStatus, CardCategory, UserStatus } from './common/enums';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [...modules],
      resolvers: {
        CardStatus: CardStatus,
        CardCategory: CardCategory,
        UserStatus: UserStatus,
      },
      formatError: (error: any) => {
        const graphQLFormattedError: any = {
          ...error.extensions,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphQlModule {}
