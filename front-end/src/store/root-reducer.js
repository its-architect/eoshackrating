import { combineReducers }         from 'redux-immutable';
import appReducer                  from 'ducks/app';
import userReducer, { userTypes }  from 'ducks/user';
import companiesReducer            from 'ducks/companies';

export default ( state, action ) => {
    if ( action.type === userTypes.SIGN_OUT ) {
        state = undefined; // reset state on user logOut
    }

    return combineReducers({
        app: appReducer,
        user: userReducer,
        companies: companiesReducer,
    })(state, action);
};
