import { connect } from 'react-redux';
import React from 'react';
import { UserRatingComponent } from 'components/pages';
import { appSelectors } from 'ducks/app';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

const mockUser = fromJS({
    index: '322',
    company: 'It sphera',
    name: 'Arseniy Ivanov',
    rating: 10,
});

const UserRatingContainer = ( props ) => {
    const { user } = props;
    return <UserRatingComponent user={ user } />;
};

UserRatingContainer.propTypes = {
    user: ImmutablePropTypes.map
};

export default connect(
    state => {
        const index = appSelectors.selectQueryParam(state, 'id');
        return ({
            user: mockUser,
            index
        });
    },
    null,
)(UserRatingContainer);
