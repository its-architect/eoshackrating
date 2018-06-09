/**
 * Map error
 *
 * @param {Object} responseError
 * @returns {Object}
 */
export const mapError = ( responseError ) => ({ error: responseError });

/**
 * Map action cancel
 *
 * @returns {Object}
 */
export const mapCancel = () => ({ canceled: true });
