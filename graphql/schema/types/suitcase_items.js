import {
    GraphQLObjectType,
    GraphQLInt
  } from 'graphql';

export default new GraphQLObjectType({
    name: 'suitcaseItemType',
    fields: () => ({
        item_amount: {
            type: GraphQLInt
        }
    })
});