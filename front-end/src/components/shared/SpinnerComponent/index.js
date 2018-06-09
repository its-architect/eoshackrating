import React            from 'react';
import PropTypes        from 'prop-types';
import styles           from './styles.scss';
import { SpinnerIcon }  from 'assets/icons';
import classNames       from 'classnames/bind';

const cx = classNames.bind(styles);

const SpinnerComponent = ( props ) => {
    const { row, full, small } = props;

    return (
        <div
            className={ cx(styles.spinner, {
                [ styles.spinnerRow ]: row,
                [ styles.spinnerFull ]: full,
                [ styles.spinnerSmall ]: small,
            }) }
        >
            <SpinnerIcon />
        </div>
    );
};

SpinnerComponent.propTypes = {
    row: PropTypes.bool,
    small: PropTypes.bool,
    full: PropTypes.bool,
};

export default SpinnerComponent;
