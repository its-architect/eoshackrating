import epicCreator from '../epicCreator';
import types from './types';
import selectors from './selectors';
import actions from './actions';
import 'rxjs/add/operator/mergeMap';
import services from './services';
import * as mappers from './mappers';
import * as sharedMappers from 'ducks/sharedMappers';
import { of } from 'rxjs/observable/of';

/**
 * Handle xhr request/response/error/cancel logic to update company
 *
 * @param {Function} action$
 * @param {Object} state
 */
export const fetchCompanyRequest = ( action$, state ) => epicCreator(
    action$,
    types.FETCH_COMPANIES_REQUEST,
    () => observer => {
        const subscription = services
            .fetchCompaniesRequest()
            .map(( { response } ) => (actions.fetchCompaniesSuccess(response)))
            .catch(error => of(actions.fetchCompaniesError(
                sharedMappers.mapError(error)
            )))
            .subscribe(( value ) => {
                observer.next(value);
            });

        return () => {
            subscription.unsubscribe();
            const isFetching = selectors.isFetchingCompanies(state.getState()).isFetching === types.FETCH_COMPANIES_REQUEST;
            if ( isFetching ) {
                state.dispatch(actions.fetchCompaniesError(
                    sharedMappers.mapCancel()
                ));
            }
        };
    }
);
