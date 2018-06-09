import React, { PureComponent } from 'react';
import styles from './styles.scss';
import { ROUTES } from 'constants.js';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { UserRatingContainer, CompanyRatingContainer } from 'containers/pages';

class MainComponent extends PureComponent {
    render() {
        return (
            <main className={ styles.main }>
                <Route
                    render={ ( { location } ) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={ location.key }
                                classNames={ {
                                    enter: styles.pageEnter,
                                    enterActive: styles.pageEnterActive,
                                    enterDone: styles.pageEnterDone,
                                    exit: styles.pageExit,
                                    exitActive: styles.pageExitActive,
                                } }
                                timeout={ (+styles.timeout.slice(0, -1)) * 1000 }
                            >
                                <Switch location={ location }>
                                    <Route
                                        exact
                                        path={ ROUTES.ROOT }
                                        component={ CompanyRatingContainer }
                                    />
                                    <Route
                                        path={ ROUTES.USER_RATING }
                                        component={ UserRatingContainer }
                                    />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    ) }
                />
            </main>
        );
    }
}

MainComponent.propTypes = {};

export default MainComponent;
