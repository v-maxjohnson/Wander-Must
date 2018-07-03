import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';

import suitcaseType from './../types/suitcase';
import localeType from './../types/locale';
import itemType from './../types/item';
import userType from './../types/user';
// import travelCategory from './../types/suitcase';
import resolvers from './../../resolvers';


export default new GraphQLObjectType ({
    name: 'Mutations',
    fields: () => ({
        //CREATE NEW SUITCASE, LOCALE, OR ITEM
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
        // MODIFY ITEMS ON SUITCASE
        // addItemToSuitcase: {
        //     type: suitcaseType,
        //     args: {
        //         id: {
        //             type: GraphQLString
        //         },
        //         item_ids: {
        //             type: GraphQLList
        //         }
        //     },
        //     resolve : ( root, args ) => resolvers.suitcase.addItem( args )
        // },
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
            resolve : ( root, args ) => resolvers.suitcase.updateItem( args )
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
        },
        // MODIFY NOTE ON SUITCASE
        updateNoteOnSuitcase: {
            type: suitcaseType,
            args: {
                id: {
                    type: GraphQLString
                },
                note: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.updateNote( args )
        },
        // DELETE SUITCASE
        deleteSuitcase: {
            type: suitcaseType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.delete( args )
        },
        // MODIFY USER INFO
        updateUserInfo: {
            type: userType,
            args: {
                id: {
                    type: GraphQLString
                },
                username: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                gender: {
                    type: GraphQLString
                },
                user_image: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.user.changeInfo( args ) 
        },
        // DELETE USER
        deleteUser: {
            type: userType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolver.user.delete( args ) 
        },
    })
});


///////// PUT ALL MUTATIONS IN THIS FILE INSTEAD OF SEPARATING THEM ALL