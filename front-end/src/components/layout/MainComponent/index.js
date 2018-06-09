import React, { PureComponent } from 'react';
import styles from './styles.scss';
import { ROUTES } from 'constants.js';
import { Switch } from 'react-router-dom';

import {
    LandingComponent
} from 'components/pages';
import { RedirectRouteComponent } from 'components/shared';
import { UserRatingContainer, RatingContainer } from 'containers/pages';

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
                        component={ RatingContainer }
                    />
                    <RedirectRouteComponent
                        path={ ROUTES.USER_RATING }
                        component={ UserRatingContainer }
                    />

                </Switch>
            </main>
        );
    }
}

MainComponent.propTypes = {};

export default MainComponent;
