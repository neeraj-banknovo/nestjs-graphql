import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { modules } from '../modules';
import { CardStatus, CardCategory, UserStatus } from '../common/enums';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql/endpoint1',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [...modules],
      useGlobalPrefix: true,
      resolvers: {
        /* 
        List all your Graphql enums and scalars here.
        Note - List the Enums and Scalars to be used in this endpoint only
         */
        CardStatus,
        CardCategory,
        UserStatus,
      },
      formatError: (error: any) => {
        /* Control & intercept the GraphQl errors here */
        const graphQLFormattedError: any = {
          ...error.extensions,
        };
        return graphQLFormattedError;
      },
    }),

    /* Multiple endpoints support*/
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql/endpoint2',
      autoSchemaFile: join(process.cwd(), 'src/schema2.gql'),
      include: [],
      useGlobalPrefix: true,
      resolvers: {
        /* 
        List all your Graphql enums and scalars here.
        Note - List the Enums and Scalars to be used in this endpoint only
         */
      },
      formatError: (error: any) => {
        /* Control & intercept the GraphQl errors here */
        const graphQLFormattedError: any = {
          ...error.extensions,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphQlModule {}
