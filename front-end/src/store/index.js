import createHistory                     from 'history/createBrowserHistory';
import rootReducer                       from './root-reducer';
import { composeWithDevTools }           from 'redux-devtools-extension';
import { createStore, applyMiddleware }  from 'redux';
import { routerMiddleware }              from 'react-router-redux';
import { Map }                           from 'immutable';

export const history = createHistory();

const reduxRouterMiddleware = routerMiddleware(history);
const initialState = Map();

let middleware = [
    reduxRouterMiddleware,
];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(
            ...middleware
        )
    )
);

export default store;
