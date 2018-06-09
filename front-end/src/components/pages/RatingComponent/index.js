import styles from './styles.scss';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CompanyListItemComponent from './CompanyListItemComponent';

class RatingComponent extends PureComponent {
    state = {
        activeCompanyIndex: null,
    };

    /**
     * Handle company toggle
     *
     * @param {string} companyIndex
     */
    handleCompanyToggle = ( companyIndex ) => {
        const resultIndex = this.state.activeCompanyIndex === companyIndex ?
            null : companyIndex;

        this.setState({ activeCompanyIndex: resultIndex });
    };

    render() {
        const { companies } = this.props;
        const { handleCompanyToggle } = this;
        const { activeCompanyIndex } = this.state;

        const companyItems = companies.map(company => (
            <CompanyListItemComponent
                key={ company.get('index') }
                company={ company }
                handleCompanyToggle={ handleCompanyToggle }
                activeCompanyIndex={ activeCompanyIndex }
            />
        ));

        return (
            <div className={ styles.page }>
                <h1>
                    Rating list by organizations
                </h1>
                <div className={ styles.companiesVs }>
                    <div>
                        { companyItems }
                    </div>
                    <span>
                    vs
                    </span>
                    <div>
                        { companyItems }
                    </div>
                </div>
            </div>
        );
    }
}

RatingComponent.propTypes = {
    companies: ImmutablePropTypes.list.isRequired
};

export default RatingComponent;
