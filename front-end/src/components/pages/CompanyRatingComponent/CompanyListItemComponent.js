import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { HexIcon } from 'assets/icons';
import classNames from 'classnames';
import { ROUTES } from 'constants.js';
import { NavLink } from 'react-router-dom';
import { AvatarComponent, RatingComponent } from 'components/shared';

const CompanyListItemComponent = ( props ) => {
    const { company, activeCompanyIndex, handleCompanyToggle } = props;

    const isActive = company.get('index') === activeCompanyIndex;

    const memberItems = !isActive ? null :
        company.get('users').map(user => (
            <NavLink
                to={ `${ROUTES.USER_RATING}?id=${user.get('index')}` }
                className={ styles.employBox }
                key={ user.get('index') }
            >
                <div className={ styles.employMain }>
                    <AvatarComponent
                        avatar={ user.get('avatar') }
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
        ));

    return (
        <div>
            <div
                className={ styles.companyBox }
                onClick={ () => {
                    handleCompanyToggle(company.get('index'));
                } }
            >
                <span className={ styles.companyTitle }>
                    { company.get('title') }
                </span>
                <RatingComponent
                    className={ styles.rating }
                    rating={ company.get('rating') }
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
    activeCompanyIndex: PropTypes.string,
    handleCompanyToggle: PropTypes.func.isRequired
};

export default CompanyListItemComponent;
