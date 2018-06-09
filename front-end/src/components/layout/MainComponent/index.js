import React, { PureComponent }  from 'react';
import styles                    from './styles.scss';
import { Routes }                from 'constants.js';
import { Switch }                from 'react-router-dom';

import {
    LandingComponent,
}                                                    from 'components/pages';
import { RedirectRouteComponent } from 'components/shared';

class MainComponent extends PureComponent {
    render() {
        return (
            <main className={ styles.main }>
                <Switch>
                    { /* all users */ }
                    <RedirectRouteComponent
                        exact
                        path={ Routes.ROOT }
                        component={ LandingComponent }
                    />

                </Switch>
            </main>
        );
    }
}

MainComponent.propTypes = {
};

export default MainComponent;
