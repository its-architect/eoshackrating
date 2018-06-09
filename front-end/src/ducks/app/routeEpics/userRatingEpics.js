import * as userEpics from 'ducks/user/epics';
import { of } from 'rxjs/observable/of';
import { asap } from 'rxjs/scheduler/asap';
import { userActions } from 'ducks/user';
import appSelectors from '../selectors';

/**
 * Handle get user
 *
 * @param {Function} action$
 * @param {Object} state
 */
const initFetchCompanies = ( action$, state ) => {
    return of(userActions.getUserRequest(appSelectors.selectQueryParam(state.getState(), 'id'))).observeOn(asap);
};

export default [
    userEpics.getUser,
    initFetchCompanies,
];
