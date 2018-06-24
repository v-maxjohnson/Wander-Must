import { GraphQLSchema } from 'graphql';
  
import itemType from './types/item'
import localeType from './types/locale'
import suitcaseType from './types/suitcase'
import userType from './types/user';

import query from './queries';
// import mutations from './mutations';

export default new GraphQLSchema({
  query: query,
  // mutation: mutations,
  types: [
      itemType,
      localeType,
      suitcaseType,
      userType
  ]
});