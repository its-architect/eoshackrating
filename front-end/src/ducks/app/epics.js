import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { merge } from 'rxjs/observable/merge';
import { LOCATION_CHANGE } from 'react-router-redux';
import routeEpics from './routeEpics';

/**
 * Launch route specific actions if such exist and cancel previous one
 *
 * @param {Function} action$
 * @param {Object} state - redux state
 */
const addEpicsForRoute = ( action$, state ) => action$
    .ofType(LOCATION_CHANGE)
    .switchMap(( action ) => {
        let epicsForRoute = routeEpics[ action.payload.pathname ];

        return merge(
            ...epicsForRoute.map(observableCreator => observableCreator(action$, state))
        );
    });

/**
 * Global Epics
 */
export default [
    addEpicsForRoute,
];
