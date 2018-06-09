import React                from 'react';
import { Route, Redirect }  from 'react-router-dom';
import PropTypes            from 'prop-types';

const RedirectRouteComponent = ( props ) => {
    const { redirectTo, redirectWhen, component: Component, ...restProps } = props;

    return (
        redirectTo ?
            <Route
                { ...restProps }
                render={ () => (
                    redirectWhen ? (
                        <Redirect to={ redirectTo } />
                    ) : (
                        <Component />
                    ))
                }
            /> :
            <Route
                { ...restProps }
                component={ Component }
            />
    );
};

RedirectRouteComponent.propTypes = {
    redirectTo: PropTypes.string,
    redirectWhen: PropTypes.bool,
    component: PropTypes.func.isRequired,
};

export default RedirectRouteComponent;
