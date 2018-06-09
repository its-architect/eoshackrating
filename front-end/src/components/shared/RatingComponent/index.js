import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { HexIcon } from 'assets/icons';

const RatingComponent = ( props ) => {
    const { rating, className } = props;
    return (
        <div className={ classNames(className, styles.ratingBox) }>
            <span className={ styles.ratingValue }>
                { rating }
            </span>
            <HexIcon />
        </div>
    );
};

RatingComponent.propTypes = {
    rating: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired
};

export default RatingComponent;
