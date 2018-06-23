import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLEnumType,
    GraphQLInt
  } from 'graphql';

const itemCategory = new GraphQLEnumType({
    name: 'ItemCategoryEnum',
    values: {
        TOILETRIES: {
            value: 'toiletries'
        },
        CLOTHING: {
            value: 'clothing'
        },
        ELECTRONICS: {
            value: 'electronics'
        },
        ACCESSORIES: {
            value: 'accessories'
        }
    }
});

export default new GraphQLObjectType({
    name: 'ItemType',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        item_name: {
            type: GraphQLString
        },
        item_category: {
            type: itemCategory
        },
        item_amount: {
            type: GraphQLInt
        }
    })
});