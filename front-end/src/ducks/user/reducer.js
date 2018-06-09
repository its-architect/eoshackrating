import { fromJS, Map }  from 'immutable';
import types            from './types';

const initialState = fromJS({
    status: {},
    info: null,
});

export default ( state = initialState, action ) => {
    switch (action.type) {
        case types.GET_USER_REQUEST:
            return state
                .set('status', Map({ isFetching: action.type }));
        case types.GET_USER_SUCCESS:
            return state
                .set('status', Map({ success: action.type }));
        case types.GET_USER_ERROR:
            return state
                .set('status', Map({ errors: Map(action.error) }));
        default:
            return state;
    }
};
