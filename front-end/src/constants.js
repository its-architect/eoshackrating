export const ROUTES = {
    ROOT: '/',
    USER_RATING: '/user_rating',
    RATING_LIST: '/rating_list',
};

export const BASE_API =
    process.env.NODE_ENV === 'development' ?
        '/api' :
        process.env.STAGE ?
            'https://astage.itsphere.io' : 'https://api.itsphere.io';
