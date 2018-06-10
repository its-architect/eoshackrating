import React, { PureComponent } from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import 'assets/images/322140.png';
import 'assets/images/245720.png';
import 'assets/images/315143.png';
import 'assets/images/322444.png';
import 'assets/images/322489.png';
import 'assets/images/322491.png';
import 'assets/images/460718.png';

class AvatarComponent extends PureComponent {
    render() {
        const { avatar, className } = this.props;
        let avatarImage;
        if ( avatar ) {
            avatarImage = `/images/${avatar}.png`;
        }

        return (
            <div
                className={ className + ' ' + styles.avatar }
                style={ { backgroundImage: `url(${avatarImage}` } }
            />
        );
    }
}

AvatarComponent.propTypes = {
    avatar: PropTypes.number,
    className: PropTypes.string,
};

export default AvatarComponent;
