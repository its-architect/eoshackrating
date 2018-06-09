import React      from 'react';
import PropTypes  from 'prop-types';
import styles     from './styles.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ButtonHamburgerComponent = ( props ) => {
    const { isOpen, _handleToggle, className } = props;
    return (
        <button
            className={ cx(className, styles.buttonContainer) }
            onClick={ _handleToggle }
        >
            <div
                className={ cx(styles.button, { [ styles.buttonOpen ]: isOpen }) }
            >
                <span className={ styles.line } />
                <span className={ styles.line } />
                <span className={ styles.line } />
            </div>
        </button>
    );
};

ButtonHamburgerComponent.propTypes = {
    isOpen: PropTypes.bool,
    className: PropTypes.string,
    _handleToggle: PropTypes.func.isRequired,
};

export default ButtonHamburgerComponent;
