export const ROUTES = {
    ROOT: '/',
    USER_RATING: '/user_rating',
};

export const BASE_API =
    process.env.NODE_ENV === 'development' ?
        '/api' : 'http://hackrating.itsphere.io/api';

export const API_REQUESTS = {
    COMPANIES: BASE_API + '/2/projects',//http://hackrating.itsphere.io/api/projects
    USER: BASE_API + '/2/user'//http://hackrating.itsphere.io/api/user?id=asdf
};
