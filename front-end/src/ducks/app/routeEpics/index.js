import { ROUTES }               from 'constants.js';
import companyRatingEpics from './companyRatingEpics';
import userRatingEpics from './userRatingEpics';

export default {
    [ ROUTES.ROOT ]: companyRatingEpics,
    [ ROUTES.USER_RATING ]: userRatingEpics,
};
