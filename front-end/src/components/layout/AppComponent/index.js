import React, { Fragment } from 'react';
import {
    HeaderContainer,
    MainContainer,
}                           from 'containers';
import { FooterComponent } from 'components/layout';
import './styles.scss';

const AppComponent = () => (
    <Fragment>
        <HeaderContainer />
        <MainContainer />
        <FooterComponent />
    </Fragment>
);

export default AppComponent;
