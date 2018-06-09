import types                  from './types';

export default {
    /**
     * Request to fetch companies action
     */
    fetchCompaniesRequest: () => ({
        type: types.FETCH_COMPANIES_REQUEST,
    }),

    /**
     * Successfully fetch companies action
     *
     * @param {Object} payload
     */
    fetchCompaniesSuccess: ( payload ) => ({
        payload,
        type: types.FETCH_COMPANIES_SUCCESS,
    }),

    /**
     * Failed to fetch companies action
     *
     * @param {Object} error
     */
    fetchCompaniesError: ( error ) => ({
        error,
        type: types.FETCH_COMPANIES_ERROR,
    }),
};
