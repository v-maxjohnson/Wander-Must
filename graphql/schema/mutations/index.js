import { GraphQLObjectType } from 'graphql';

import itemMutations from './item';
import localeMutation from './locale';
import suitcaseMutations from './suitcase';

export default new GraphQLObjectType ({
    name: 'Mutations',
    fields: () => ({
        itemMutations:{
            type: itemMutations
        },
        localeMutation:{
            type: localeMutation
        },
        // suitcaseMutations:{
        //     type: suitcaseMutations
        // }
    })
});