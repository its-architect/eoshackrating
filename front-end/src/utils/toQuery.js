/**
 * Convert object to query string - will not include keys with empty values
 *
 * @param {Object} obj
 */
const toQuery = ( obj ) => ('?' +
    Object.keys(obj).filter((key) => obj[ key ]).map(
        ( key ) => (encodeURIComponent(key) + '=' + encodeURIComponent(obj[ key ]))
    ).join('&')
);

export default toQuery;
