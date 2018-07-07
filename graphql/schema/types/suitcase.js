import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLEnumType
  } from 'graphql';

import localeType from './locale';
import itemType from './item';
import userType from './user';
import suitcaseItemsType from './suitcase_items';

export const travelCategory = new GraphQLEnumType({
    name: 'TravelCategoryEnum',
    values: {
        BUSINESS: {
            value: 'business'
        },
        LEISURE: {
            value: 'leisure'
        },
        ADVENTURE: {
            value: 'adventure'
        },
        VACATION: {
            value: 'vacation'
        }
    }
});

export default new GraphQLObjectType({
    name: 'SuitcaseType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        start_date: {
            type: GraphQLString
        },
        end_date: {
            type: GraphQLString
        },
        travel_category: {
            type: travelCategory
        },
        note_title: {
            type: GraphQLString
        },
        notes: {
            type: GraphQLString
        },
        Locale: {
            type: localeType
        },
        User: {
            type: userType
        },
        Items : {
            type: GraphQLList(itemType)
        },
        suitcase_items : {
            type: suitcaseItemsType
        }
    })
});