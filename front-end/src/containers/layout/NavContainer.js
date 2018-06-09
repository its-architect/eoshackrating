import React, { PureComponent }        from 'react';
import PropTypes                       from 'prop-types';
import { connect }                     from 'react-redux';
import { NavComponent }                from 'components/layout';

class NavContainer extends PureComponent {
    state = {
        isOpen: false,
    };

    static propTypes = {
        emailConfirmed: PropTypes.bool,
        userRole: PropTypes.string,
    };

    _handleClose = () => {
        this.setState({ isOpen: false });
    };

    _handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const { isOpen } = this.state;
        const { _handleToggle, _handleClose } = this;
        return (
            <NavComponent
                _handleToggle={ _handleToggle }
                _handleClose={ _handleClose }
                isOpen={ isOpen }
            />
        );
    }
}

export default connect(
    null,
    null
)(NavContainer);
