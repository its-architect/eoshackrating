import { fromJS, Map, OrderedSet }  from 'immutable';
import types                        from './types';

const initialState = fromJS(
    {
        status: {},
        allIds: OrderedSet(),
        byId: {},
    }
);

export default ( state = initialState, action ) => {
    switch (action.type) {
        case types.FETCH_COMPANIES_REQUEST:
            return state
                .setIn([ 'status' ], Map({ isFetching: action.type }));
        case types.FETCH_COMPANIES_SUCCESS:

            return state
                .setIn([ 'status' ], Map({ success: action.type }));
        case types.FETCH_COMPANIES_ERROR:
            return state
                .setIn([ 'status' ], Map({ errors: Map(action.error) }));

        default:
            return state;
    }
};
