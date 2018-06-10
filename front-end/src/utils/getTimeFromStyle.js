/**
 * Get css time value in seconds and return js ms value
 *
 * @param {string} cssTime
 * @return {number}
 */
const getTimeFromStyle = ( cssTime ) => (+cssTime.slice(0, -1)) * 1000;

export default getTimeFromStyle;
