import React        from 'react';
import PropTypes    from 'prop-types';
import { HexIcon }  from 'assets/icons';
import styles       from './styles.scss';

const ScoreComponent = ( props ) => {
    const { score, size, total, className } = props;

    return (
        <div className={ styles.scoreBox + ' ' + className }>
            <div
                className={ styles.scoreValue }
                style={ { width: size, height: size, fontSize: size / 2 } }
            >
                <HexIcon />
                { score }
            </div>
            { total &&
            <span>
                &nbsp;/&nbsp;10
            </span>
            }
        </div>
    );
};

ScoreComponent.propTypes = {
    total: PropTypes.bool,
    className: PropTypes.string,
    score: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
};

export default ScoreComponent;
