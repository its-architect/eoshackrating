import { combineReducers }         from 'redux-immutable';
import appReducer                  from 'ducks/app';

export default ( state, action ) => {
    return combineReducers({
        app: appReducer,
    })(state, action);
};
