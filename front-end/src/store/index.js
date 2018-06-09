import createHistory                     from 'history/createBrowserHistory';
import rootReducer                       from './root-reducer';
import rootEpic                          from './root-epic';
import { composeWithDevTools }           from 'redux-devtools-extension';
import { createStore, applyMiddleware }  from 'redux';
import { routerMiddleware }              from 'react-router-redux';
import { createEpicMiddleware }          from 'redux-observable';
import { Map }                           from 'immutable';

export const history = createHistory();

const epicMiddleware = createEpicMiddleware(rootEpic);
const reduxRouterMiddleware = routerMiddleware(history);
const initialState = Map();

let middleware = [
    reduxRouterMiddleware,
    epicMiddleware,
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
