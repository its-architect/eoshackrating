import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import { HexIcon } from 'assets/icons';
import classNames from 'classnames';

const CompanyListItemComponent = ( props ) => {
    const { company, activeCompanyIndex, handleCompanyToggle } = props;

    const isActive = company.index === activeCompanyIndex;

    const memberItems = !isActive ? null :
        company.employees.map(employee => (
            <div
                className={ styles.employBox }
                key={ employee.index }
            >
                <span className={ styles.employTitle }>
                    { employee.name }
                </span>
                <div className={ styles.ratingBox }>
                    <span className={ styles.ratingValue }>
                        { employee.rating }
                    </span>
                    <HexIcon />
                </div>
            </div>
        ));

    return (
        <div>
            <div
                className={ styles.companyBox }
                onClick={ () => {
                    handleCompanyToggle(company.index);
                } }
            >
                <span className={ styles.companyTitle }>
                    { company.title }
                </span>
                <div className={ classNames(styles.ratingBox, styles.ratingBoxCompany) }>
                    <span className={ styles.ratingValue }>
                        { company.rating }
                    </span>
                    <HexIcon />
                </div>
            </div>
            { isActive &&
            <div>
                { memberItems }
            </div> }
        </div>
    );
};

CompanyListItemComponent.propTypes = {
    company: PropTypes.object.isRequired,
    activeCompanyIndex: PropTypes.string,
    handleCompanyToggle: PropTypes.func.isRequired
};

export default CompanyListItemComponent;
