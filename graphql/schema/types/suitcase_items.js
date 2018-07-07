import {
    GraphQLObjectType,
    GraphQLInt
  } from 'graphql';

import suitcaseType from './suitcase';
import itemType from './item';

export default new GraphQLObjectType({
    name: 'suitcaseItemType',
    fields: () => ({
        item_amount: {
            type: GraphQLInt
        },
        Suitcases: {
            type: GraphQLList(suitcaseType),
            Items : {
                type: GraphQLList(itemType)
            }
        }
    })
});