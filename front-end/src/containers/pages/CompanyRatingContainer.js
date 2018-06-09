import { connect } from 'react-redux';
import { CompanyRatingComponent } from 'components/pages';
import { companiesSelectors } from 'ducks/companies';

export default connect(
    state => ({
        ...companiesSelectors.isFetchingCompanies(state),
        ...companiesSelectors.companies(state),
    }),
    null
)(CompanyRatingComponent);
