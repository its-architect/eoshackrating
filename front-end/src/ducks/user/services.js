import { API_REQUESTS } from 'constants.js';
import { ajax } from 'rxjs/observable/dom/ajax';

export default {
    /**
     * Service to request sign up user
     *
     * @param {number} id
     */
    getUserRequest: ( id ) => (
        ajax.get(
            `${API_REQUESTS.USER}?id=${id}`,
        )
    )
};
