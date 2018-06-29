import { GraphQLSchema } from 'graphql';
// import { ApolloClient } from 'apollo-client';
import itemType from './types/item'
import localeType from './types/locale'
import suitcaseType from './types/suitcase'
import userType from './types/user';
// import gqlTag from "graphql-tag";

import queries from './queries';
import mutations from './mutations';

// export const client = new ApolloClient();

export default new GraphQLSchema({
  query: queries,
  mutation: mutations,
  types: [
      itemType,
      localeType,
      suitcaseType,
      userType
  ]
});

// export const gql = gqlTag;