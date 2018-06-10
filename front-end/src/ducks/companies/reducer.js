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
    switch ( action.type ) {
        case types.FETCH_COMPANIES_REQUEST:
            return state
                .setIn([ 'status' ], Map({ isFetching: action.type }));
        case types.FETCH_COMPANIES_SUCCESS:
            const filteredItems = action.payload.filter(company => company.users.length > 0);
            const cleanItems = filteredItems.map(company => ({ ...company, users: company.users.filter(user => user.rating > 0) }));
            const companies = cleanItems.reduce(
                ( acc, item ) => acc.set(item.id, fromJS(item)),
                Map()
            );

            return state
                .updateIn([ 'allIds' ], ids => ids.union(cleanItems.map(item => item.id)))
                .updateIn([ 'byId' ], byId => byId.merge(companies))
                .setIn([ 'status' ], Map({ success: action.type }));
        case types.FETCH_COMPANIES_ERROR:
            return state
                .setIn([ 'status' ], Map({ errors: Map(action.error) }));

        default:
            return state;
    }
};
