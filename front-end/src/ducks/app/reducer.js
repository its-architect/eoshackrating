import { fromJS }          from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { parseQuery }      from 'utils';

const initialState = fromJS({
    locationBeforeTransitions: {
        query: {},
    },
});

export default ( state = initialState, action ) => {
    if ( action.type === LOCATION_CHANGE ) {
        const locationBeforeTransitions = {
            ...action.payload,
            query: parseQuery(action.payload.search),
        };

        return state.merge({
            locationBeforeTransitions,
        });
    }

    return state;
};
