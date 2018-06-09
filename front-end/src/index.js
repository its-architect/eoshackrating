import { AppContainer as HotLoader } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'containers';
import store, { history } from 'store';
import './common.scss';

window.Intl = require('intl');

const renderApp = Component =>
    render(
        <HotLoader>
            <Provider store={ store }>
                <ConnectedRouter history={ history }>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </HotLoader>,
        document.getElementById('app')
    );

renderApp(AppContainer);
if ( module.hot ) {
    module.hot.accept('containers', () => renderApp(AppContainer));
}
