import React, { Fragment } from 'react';
import {
    HeaderContainer,
    NavContainer,
    MainContainer,
}                           from 'containers';
import { FooterComponent } from 'components/layout';
import './styles.scss';

const AppComponent = () => (
    <Fragment>
        <HeaderContainer />
        <NavContainer />
        <MainContainer />
        <FooterComponent />
    </Fragment>
);

export default AppComponent;
