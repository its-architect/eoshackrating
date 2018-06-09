import { connect } from 'react-redux';
import { UserRatingComponent } from 'components/pages';
import { appSelectors } from 'ducks/app';
import { fromJS } from 'immutable';

const mockUser = fromJS({
    index: '322',
    company: 'It sphera',
    name: 'Arseniy Ivanov',
    rating: 10,
});

export default connect(
    state => {
        const index = appSelectors.selectQueryParam(state, 'id');
        return ({
            user: mockUser,
            index
        });
    },
    null,
)(UserRatingComponent);
