import { ajax }         from 'rxjs/observable/dom/ajax';
import { API_REQUESTS } from 'constants.js';

export default {
    /**
     * Service to fetch companies
     */
    fetchCompaniesRequest: () => (
        ajax.get(
            API_REQUESTS.COMPANIES,
        )
    )
};
