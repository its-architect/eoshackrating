import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ROUTES } from 'constants.js';
import { NavLink } from 'react-router-dom';
import { AvatarComponent, RatingComponent } from 'components/shared';

const CompanyListItemComponent = ( props ) => {
    const { company, activeCompanyIndex, handleCompanyToggle } = props;

    const isActive = company.get('id') === activeCompanyIndex;
    let companyRating = 0;
    company.get('users').forEach(user => {
        companyRating = companyRating + user.get('rating');
    });
    companyRating = companyRating/(company.get('users').size)^0;

    const memberItems = !isActive ? null :
        company.get('users').map(user => {
            return (
                <NavLink
                    to={ `${ROUTES.USER_RATING}?id=${user.get('id')}` }
                    className={ styles.employBox }
                    key={ user.get('id') }
                >
                    <div className={ styles.employMain }>
                        <AvatarComponent
                            avatar={ user.get('id') }
                            className={ styles.avatar }
                        />
                        <span className={ styles.employTitle }>
                        { user.get('name') }
                    </span>
                    </div>
                    <RatingComponent
                        className={ styles.rating }
                        rating={ user.get('rating') }
                    />
                </NavLink>
            );
        });

    return (
        <div>
            <div
                className={ styles.companyBox }
                onClick={ () => {
                    handleCompanyToggle(company.get('id'));
                } }
            >
                <span className={ styles.companyTitle }>
                    { company.get('name') }
                </span>
                <RatingComponent
                    className={ styles.rating }
                    rating={ companyRating }
                />
            </div>
            { isActive &&
            <div>
                { memberItems }
            </div> }
        </div>
    );
};

CompanyListItemComponent.propTypes = {
    company: ImmutablePropTypes.map.isRequired,
    activeCompanyIndex: PropTypes.number,
    handleCompanyToggle: PropTypes.func.isRequired
};

export default CompanyListItemComponent;
