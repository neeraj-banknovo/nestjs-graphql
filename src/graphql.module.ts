import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { modules } from './modules';
import { CardStatus, CardCategory } from './common/enums';

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
