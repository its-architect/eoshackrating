import React from 'react';
import styles from './styles.scss';
import { AvatarComponent, RatingComponent } from 'components/shared';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

const UserRatingComponent = ( props ) => {
    const { user } = props;

    return (
        <div className={ styles.page }>
            <div className={ styles.mainInfo }>
                <div>
                    <h2 className={ styles.header }>
                        <span className={ styles.name }>
                            { user.get('name') }
                        </span>
                        <span className={ styles.companyTitle }>
                            { user.get('company') }
                        </span>
                    </h2>
                    <div className={ classNames(styles.ratingBox, styles.hideOnMobile) }>
                        Current rating
                        <RatingComponent
                            className={ styles.rating }
                            rating={ user.get('rating') }
                        />
                    </div>
                </div>
                <div className={ styles.avatarBox }>
                    <AvatarComponent
                        className={ styles.avatar }
                        avatar={ user.get('avatar') }
                    />
                    <div className={ classNames(styles.ratingBox, styles.hideOnDesktop) }>
                        Current rating
                        <RatingComponent
                            className={ styles.rating }
                            rating={ user.get('rating') }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

UserRatingComponent.propTypes = {
    user: ImmutablePropTypes.map.isRequired
};

export default UserRatingComponent;
