import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CardStatus, CardCategory, UserStatus } from '../common/enums';
import { modules } from '../modules';
import { AdminModule } from '../modules/admin/admin.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql/endpoint1',
      autoSchemaFile: join(process.cwd(), 'src/schema/schema1.gql'),
      include: [...modules],
      useGlobalPrefix: true, // its will use /api prefix defined in main.ts
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
      autoSchemaFile: join(process.cwd(), 'src/schema/schema2.gql'),
      include: [AdminModule],
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
