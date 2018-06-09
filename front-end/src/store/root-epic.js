import { combineEpics }   from 'redux-observable';
import { appEpics }       from 'ducks/app';

export default combineEpics(
    ...appEpics,
);
