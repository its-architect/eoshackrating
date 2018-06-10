import epicCreator from '../epicCreator';
import types from './types';
import actions from './actions';
import selectors from './selectors';
import services from './services';
import { of } from 'rxjs/observable/of';
import * as sharedMappers from 'ducks/sharedMappers';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/observeOn';

/**
 * Handle xhr request/response/error/cancel logic of update user request
 *
 * @param {Function} action$
 * @param {Object} state
 */
export const getUser = ( action$, state ) => epicCreator(
    action$,
    types.GET_USER_REQUEST,
    ( { id } ) => observer => {
        const subscription = services
            .getUserRequest(id)
            .map(( { response } ) => actions.getUserSuccess(response))
            .catch(error => of(actions.getUserError(
                sharedMappers.mapError(error)
            )))
            .subscribe(( value ) => {
                observer.next(value);
            });
        return () => {
            subscription.unsubscribe();
            const isFetching = selectors.isFetching(state.getState()).isFetching === types.GET_USER_REQUEST;
            if ( isFetching ) {
                state.dispatch(actions.getUserError(
                    sharedMappers.mapCancel()
                ));
            }
        };
    }
);
