import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import itemType from './../types/item';
import resolvers from './../../resolvers';

export default new GraphQLObjectType ({
    name: 'itemMutations',
    fields: () => ({
        createNewItem: {
            type: itemType,
            args: {
                item_name: {
                    type: GraphQLString
                }
            },
            resolve: ( args ) => resolvers.item.create( args )
        }
    })
})