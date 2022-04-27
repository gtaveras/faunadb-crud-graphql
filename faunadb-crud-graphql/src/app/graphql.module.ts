import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://graphql.fauna.com/graphql'; // <-- add the URL of the GraphQL server here
const token = 'fnAElB7VdMACUA-WXobo7pM_OMp6_wwpRhMcMNy5';


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const basicAndAuth = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
      authorization: `Bearer ${token}`
    }
  }));

  const link = ApolloLink.from([basicAndAuth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
