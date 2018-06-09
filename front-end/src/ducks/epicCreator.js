import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

/**
 * Helper function for Epic creation
 *
 * @param {Function} action$
 * @param {string} type - action type to watch
 * @param ObservableCreate - custom Observable with async logic
 * @returns {Observable}
 */
const epicCreator = ( action$, type, ObservableCreate ) => (
    action$.ofType(type).mergeMap(( args ) =>
        Observable.create(
            ObservableCreate(args)
        )
    )
);

export default epicCreator;
