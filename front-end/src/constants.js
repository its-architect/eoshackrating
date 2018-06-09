export const Routes = {
    ROOT: '/',
    LINK1: '/link1',
};

export const BASE_API =
    process.env.NODE_ENV === 'development' ?
        '/api' :
        process.env.STAGE ?
            'https://astage.itsphere.io' : 'https://api.itsphere.io';
