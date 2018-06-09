import React              from 'react';
import styles             from './styles.scss';
import PropTypes          from 'prop-types';
import userPlaceholder    from 'assets/images/userPlaceholder.png';

const AvatarComponent = ( props ) => {
    const { avatar, className } = props;

    return (
        <div
            className={ className + ' ' + styles.avatar }
            style={ { backgroundImage: `url(${avatar || userPlaceholder}` } }
        />
    );
};

AvatarComponent.propTypes = {
    avatar: PropTypes.string,
    className: PropTypes.string,
};

export default AvatarComponent;
