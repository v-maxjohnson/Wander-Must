import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
  } from 'graphql';

import localeType from './locale';
import suitcaseType from './suitcase';
import itemType from './item';

export default new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password : {
            type: GraphQLString
        },
        gender : {
            type: GraphQLString
        },
        user_image : {
            type: GraphQLString
        },
        Suitcases: {
            type: GraphQLList(suitcaseType),
            Locale: {
                type: localeType
                },
            Items : {
                type: GraphQLList(itemType)
            }
        }
    })
});