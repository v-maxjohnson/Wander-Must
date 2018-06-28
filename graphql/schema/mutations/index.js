import { 
    GraphQLObjectType,
    GraphQLString 
} from 'graphql';

import localeType from './../types/locale';
import itemType from './../types/item';
import resolvers from './../../resolvers';


export default new GraphQLObjectType ({
    name: 'Mutations',
    fields: () => ({
        createNewItem: {
            type: itemType,
            args: {
                item_name: {
                    type: GraphQLString
                }
            },
            resolve: ( args ) => resolvers.item.create( args )
        },
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
            resolve: ( root, args ) => resolvers.locale.create( args )
        }
        // suitcaseMutations:{
        //     type: suitcaseMutations
        // }
    })
});


///////// PUT ALL MUTATIONS IN THIS FILE INSTEAD OF SEPARATING THEM ALL