import {
    GraphQLObjectType,
    GraphQLString
  } from 'graphql';

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
        }
    })
});