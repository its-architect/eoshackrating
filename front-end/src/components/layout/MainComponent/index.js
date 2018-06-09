import React, { PureComponent }  from 'react';
import styles                    from './styles.scss';
import { ROUTES }                from 'constants.js';
import { Switch }                from 'react-router-dom';

import {
    LandingComponent,
    RatingComponent
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
                        path={ ROUTES.ROOT }
                        component={ LandingComponent }
                    />
                    <RedirectRouteComponent
                        exact
                        path={ ROUTES.RATING_LIST }
                        component={ RatingComponent }
                    />

                </Switch>
            </main>
        );
    }
}

MainComponent.propTypes = {
};

export default MainComponent;
