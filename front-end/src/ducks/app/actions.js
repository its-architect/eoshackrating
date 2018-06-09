import types from './types';

export default {
    /**
     * Change route action
     *
     * @param {string} route
     * @param {Object} params
     * @returns {Object}
     */
    changeRoute(route, params) {
        return {
            type: types.CHANGE_ROUTE,
            route,
            params,
        };
    },
};
