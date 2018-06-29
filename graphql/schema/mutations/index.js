import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import suitcaseType from './../types/suitcase';
import localeType from './../types/locale';
import itemType from './../types/item';
import travelCategory from './../types/suitcase';
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
            resolve : ( args ) => resolvers.item.create( args )
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
            resolve : ( root, args ) => resolvers.locale.create( args )
        },
        createNewSuitcase: {
            type: suitcaseType,
            args: {
                start_date: {
                    type: GraphQLString
                },
                end_date: {
                    type: GraphQLString
                },
                // travel_category: {
                //     type: travelCategory
                // },
                user_id: {
                    type: GraphQLString
                },
                locale_id: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.create( args )
        },
        updateItemAmountOnSuitcase: {
            type: suitcaseType,
            args: {
                id: {
                    type: GraphQLString
                },
                item_id: {
                    type: GraphQLString
                },
                item_amount: {
                    type: GraphQLInt
                }
            },
            resolve : ( root, args ) => resolvers.item.updateItemOnSuitcase( args )
        },
        deleteItemFromSuitcase: {
            type: itemType,
            args: {
                item_id: {
                    type: GraphQLString
                },
                suitcase_id: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.deleteItem( args )
        }
    })
});


///////// PUT ALL MUTATIONS IN THIS FILE INSTEAD OF SEPARATING THEM ALL