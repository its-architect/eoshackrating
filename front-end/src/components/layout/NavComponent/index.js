import React, { Fragment } from 'react';
import styles from './styles.scss';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'constants.js';
import PropTypes from 'prop-types';
import { ButtonHamburgerComponent } from 'components/form';
import classNames from 'classnames/bind';
import {
    ClickOutside,
} from 'components/shared';

const cx = classNames.bind(styles);

const MenuComponent = ( props ) => {
    const { isOpen, _handleToggle, _handleClose } = props;

    return (
        <nav className={ styles.nav }>
            <ClickOutside
                className={ styles.navInner }
                onClickOutside={ _handleClose }
            >
                <ButtonHamburgerComponent
                    isOpen={ isOpen }
                    _handleToggle={ _handleToggle }
                    className={ styles.menuToggle }
                />
                <div
                    className={ cx(
                        styles.menuContainer, {
                            [ styles.menuContainerOpen ]: isOpen,
                        }) }
                >
                    <div
                        className={ cx(
                            styles.menu, {
                                [ styles.menuOpen ]: isOpen,
                            }) }
                        onClick={ _handleToggle }
                    >
                        <Fragment>
                            <NavLink
                                to={ ROUTES.RATING_LIST }
                                className={ styles.link }
                            >
                                Rating list
                            </NavLink>
                        </Fragment>
                    </div>
                </div>
            </ClickOutside>
        </nav>
    );
};

MenuComponent.propTypes = {
    isOpen: PropTypes.bool,
    _handleToggle: PropTypes.func.isRequired,
    _handleClose: PropTypes.func.isRequired,
};

export default MenuComponent;
