import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import localeType from './../types/locale';
import resolvers from './../../resolvers';

export default new GraphQLObjectType ({
    name: 'localeMutation',
    fields: () => ({
        createNewLocale: {
            type: localeType,
            args: {
                locale_city: {
                    type: GraphQLString
                },
                locale_admin: {
                    type: GraphQLString
                },
                locale_country: {
                    type: GraphQLString
                }
            },
            resolve: ( args ) => resolvers.locale.create( args )
        }
    })
})