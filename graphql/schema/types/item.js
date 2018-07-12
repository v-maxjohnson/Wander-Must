import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLEnumType,
    GraphQLBoolean
  } from 'graphql';

import suitcase_items from './suitcase_items';

export const itemCategory = new GraphQLEnumType({
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
            type: GraphQLID
        },
        item_name: {
            type: GraphQLString
        },
        item_category: {
            type: itemCategory
        },
        // selected: {
        //     type: GraphQLBoolean
        // },
        suitcase_items: {
            type: suitcase_items
        }
    })
});