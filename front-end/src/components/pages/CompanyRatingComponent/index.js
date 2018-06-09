import styles from './styles.scss';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CompanyListItemComponent from './CompanyListItemComponent';
import { GatherIcon } from 'assets/icons';

class CompanyRatingComponent extends PureComponent {
    state = {
        activeCompanyLeftIndex: null,
        activeCompanyRightIndex: null,
    };

    /**
     * Handle left company toggle
     *
     * @param {string} companyIndex
     */
    handleCompanyLeftToggle = ( companyIndex ) => {
        const resultIndex = this.state.activeCompanyLeftIndex === companyIndex ?
            null : companyIndex;

        this.setState({ activeCompanyLeftIndex: resultIndex });
    };
    /**
     * Handle right company toggle
     *
     * @param {string} companyIndex
     */
    handleCompanyRightToggle = ( companyIndex ) => {
        const resultIndex = this.state.activeCompanyRightIndex === companyIndex ?
            null : companyIndex;

        this.setState({ activeCompanyRightIndex: resultIndex });
    };

    render() {
        const { companies } = this.props;
        const { handleCompanyLeftToggle, handleCompanyRightToggle } = this;
        const { activeCompanyLeftIndex, activeCompanyRightIndex } = this.state;

        const companyItemsLeft = companies.map(company => (
            <CompanyListItemComponent
                key={ company.get('index') }
                company={ company }
                handleCompanyToggle={ handleCompanyLeftToggle }
                activeCompanyIndex={ activeCompanyLeftIndex }
            />
        ));

        const companyItemsRight = companies.map(company => (
            <CompanyListItemComponent
                key={ company.get('index') }
                company={ company }
                handleCompanyToggle={ handleCompanyRightToggle }
                activeCompanyIndex={ activeCompanyRightIndex }
            />
        ));

        return (
            <div className={ styles.page }>
                <h1>
                    Rating list by organizations
                </h1>
                <div className={ styles.companiesGather }>
                    <div className={ styles.companiesLeftBox }>
                        { companyItemsLeft }
                    </div>
                    <div className={ styles.gatherIconBox }>
                        <GatherIcon
                            left={ !!activeCompanyLeftIndex }
                            right={ !!activeCompanyRightIndex }
                        />
                    </div>
                    <div className={ styles.companiesRightBox }>
                        { companyItemsRight }
                    </div>
                </div>
            </div>
        );
    }
}

CompanyRatingComponent.propTypes = {
    companies: ImmutablePropTypes.list.isRequired
};

export default CompanyRatingComponent;
