import React           from 'react';
import styles          from './styles.scss';
import { NavLink }     from 'react-router-dom';
import { ROUTES }      from 'constants.js';
import { LogoIcon }    from 'assets/icons';

const HeaderComponent = () => (
    <header className={ styles.header }>
        <NavLink
            to={ ROUTES.ROOT }
            className={ styles.logo }
        >
            <LogoIcon />
            <h1 className={ styles.headerText }>
                <span>
                    IT
                </span>
                &nbsp;
                <span className={ styles.bullet }>
                &bull;
                </span>
                &nbsp;
                <span>
                    Sphere
                </span>
            </h1>
        </NavLink>
    </header>
);

export default HeaderComponent;
