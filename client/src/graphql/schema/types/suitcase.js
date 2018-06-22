import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLEnumType
  } from 'graphql';

import localeType from './locale';
import itemType from './item';

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
        _id: {
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
        locales: {
            type: GraphQLList(localeType)
        },
        items : {
            type: GraphQLList(itemType)
        }
    })
});