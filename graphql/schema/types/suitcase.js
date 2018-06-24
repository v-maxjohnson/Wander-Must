import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLEnumType, 
    GraphQLInt
  } from 'graphql';

import localeType from './locale';
import itemType from './item';
import userType from './user';

const travelCategory = new GraphQLEnumType({
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
            type: GraphQLString
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
        notes: {
            type: GraphQLString
        },
        Locale: {
            type: localeType
        },
        Items : {
            type: GraphQLList(itemType)
        },
        User: {
            type: userType
        }
    })
});