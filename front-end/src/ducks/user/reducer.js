import { fromJS, Map, OrderedSet } from 'immutable';
import types from './types';

const initialState = fromJS({
    status: {},
    allIds: OrderedSet(),
    byId: {},
});

export default ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.GET_USER_REQUEST:
            return state
                .set('status', Map({ isFetching: action.type }));
        case types.GET_USER_SUCCESS:
            const user = action.payload;
            return state
                .updateIn([ 'allIds' ], ids => ids.union([ user.id ]))
                .setIn([ 'byId', user.id ], fromJS({ ...user, company: user.project_name }))
                .setIn([ 'status' ], Map({ success: action.type }));
        case types.GET_USER_ERROR:
            return state
                .set('status', Map({ errors: Map(action.error) }));
        default:
            return state;
    }
};
