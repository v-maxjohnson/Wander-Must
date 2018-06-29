import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
  } from 'graphql';
  import suitcaseType from './suitcase';

export default new GraphQLObjectType({
    name: 'LocaleType',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        locale_city: {
            type: GraphQLString
        },
        locale_admin: {
            type: GraphQLString
        },
        locale_country: {
            type: GraphQLString
        },
        Suitcases: {
            type: GraphQLList(suitcaseType)
        }
    })
});