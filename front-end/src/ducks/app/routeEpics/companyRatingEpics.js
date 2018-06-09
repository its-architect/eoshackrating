import * as companyEpics     from 'ducks/companies/epics';
import { of }                from 'rxjs/observable/of';
import { asap }              from 'rxjs/scheduler/asap';
import { companiesActions }  from 'ducks/companies';

/**
 * Handle fetch wallet on page open
 */
const initFetchCompanies = ( ) =>
    of(companiesActions.fetchCompaniesRequest()).observeOn(asap);

export default [
    companyEpics.fetchCompanyRequest,
    initFetchCompanies,
];
