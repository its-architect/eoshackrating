import types from './types';

export default {
    /**
     * Request to get user action
     *
     * @param {number} id
     */
    getUserRequest: ( id ) => ({
        id,
        type: types.GET_USER_REQUEST,
    }),

    /**
     * Successfully get user action
     *
     * @param {Object} payload
     */
    getUserSuccess: ( payload ) => ({
        payload,
        type: types.GET_USER_SUCCESS,
    }),

    /**
     * Failed to get user action
     *
     * @param {Object} error
     */
    getUserError: ( error ) => ({
        error,
        type: types.GET_USER_ERROR,
    })
};
