import styles from './styles.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanyListItemComponent from './CompanyListItemComponent';

class RatingComponent extends Component {
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
        const companiesMock = [
            {
                index: '123',
                title: 'IT sphere',
                rating: 10,
                employees: [
                    {
                        index: '322',
                        name: 'Arseniy Ivanov',
                        rating: 10,
                    },
                    {
                        index: '228',
                        name: 'Ivan Lukanov',
                        rating: 10,
                    },
                    {
                        index: '007',
                        name: 'Danil Petrov',
                        rating: 10,
                    }
                ]
            },
            {
                index: '223',
                title: 'IT sphere2',
                rating: 9,
                employees: [
                    {
                        index: '322',
                        name: 'Arseniy Ivanov1',
                        rating: 9,
                    },
                    {
                        index: '228',
                        name: 'Ivan Lukanov1',
                        rating: 9,
                    },
                    {
                        index: '007',
                        name: 'Danil Petrov1',
                        rating: 9,
                    }
                ]
            },
            {
                index: '423',
                title: 'IT sphere3',
                rating: 8,
                employees: [
                    {
                        index: '522',
                        name: 'Arseniy Ivanov2',
                        rating: 8,
                    },
                    {
                        index: '528',
                        name: 'Ivan Lukanov2',
                        rating: 8,
                    },
                    {
                        index: '507',
                        name: 'Danil Petrov2',
                        rating: 8,
                    }
                ]
            }
        ];
        const {
            companies = companiesMock
        } = this.props;
        const { handleCompanyToggle } = this;
        const { activeCompanyIndex } = this.state;

        const companyItems = companies.map(company => (
            <CompanyListItemComponent
                key={ company.index }
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
                { companyItems }
            </div>
        );
    }
}

RatingComponent.propTypes = {
    companies: PropTypes.array
};

export default RatingComponent;
