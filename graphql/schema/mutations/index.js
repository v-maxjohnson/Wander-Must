import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
} from 'graphql';

import suitcaseType from './../types/suitcase';
import localeType from './../types/locale';
import itemType from './../types/item';
import userType from './../types/user';

import resolvers from './../../resolvers';


export default new GraphQLObjectType ({
    name: 'Mutations',
    fields: () => ({
        //CREATE NEW SUITCASE, LOCALE, OR ITEM
        // don't wanna use this one yet
        // createNewItem: {
        //     type: itemType,
        //     args: {
        //         item_name: {
        //             type: GraphQLString
        //         },
        //         item_category: {
        //             type: GraphQLNonNull(itemCategory)
        //         }
        //     },
        //     resolve : ( args ) => resolvers.item.create( args )
        // },
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
                travel_category: {
                    type: GraphQLString
                },
                user_id: {
                    type: GraphQLID
                },
                locale_id: {
                    type: GraphQLID
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.create( args )
        },
        // MODIFY ITEMS ON SUITCASE
        addItemToSuitcase: {
            type: suitcaseType,
            args: {
                id: {
                    type: GraphQLID
                },
                item_ids: {
                    type: GraphQLList(GraphQLID)
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.addItem( args )
        },
        updateItemAmountOnSuitcase: {
            type: itemType,
            args: {
                id: {
                    type: GraphQLID
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
            type: suitcaseType,
            args: {
                suitcase_id: {
                    type: GraphQLID
                },
                item_id: {
                    type: GraphQLID
                },
            },
            resolve : ( root, args ) => resolvers.suitcase.deleteItem( args )
        },
        // MODIFY NOTE ON SUITCASE
        updateNoteOnSuitcase: {
            type: suitcaseType,
            args: {
                id: {
                    type: GraphQLID
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
                    type: GraphQLID
                }
            },
            resolve : ( root, args ) => resolvers.suitcase.delete( args )
        },
        // MODIFY USER INFO
        updateUserName: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID
                },
                username: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.user.changeName( args ) 
        },
        updateUserEmail: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID
                },
                email: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.user.changeEmail( args ) 
        },
        updateUserPassword: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.user.changePassword( args ) 
        },
        updateUserGender: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID
                },
                gender: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.user.changeGender( args ) 
        },
        updateUserImage: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID
                },
                user_image: {
                    type: GraphQLString
                }
            },
            resolve : ( root, args ) => resolvers.user.changeImage( args ) 
        },
        // DELETE USER
        deleteUser: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve : ( root, args ) => resolvers.user.delete( args ) 
        },
    })
});


///////// PUT ALL MUTATIONS IN THIS FILE INSTEAD OF SEPARATING THEM ALL