import React, { Fragment } from 'react';
import { FooterComponent, HeaderComponent, MainComponent } from 'components/layout';
import './styles.scss';

const AppComponent = () => (
    <Fragment>
        <HeaderComponent />
        <MainComponent />
        <FooterComponent />
    </Fragment>
);

export default AppComponent;
