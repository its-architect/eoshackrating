import { connect } from 'react-redux';
import { RatingComponent } from 'components/pages';
import { fromJS } from 'immutable';

const mockCompanies = fromJS([
    {
        index: '123',
        title: 'IT sphere',
        rating: 10,
        users: [
            {
                index: '322',
                name: 'Arseniy Ivanov',
                rating: 10,
            },
            {
                index: '228',
                name: 'Ivan Lukanov',
                rating: 10,
            },
            {
                index: '007',
                name: 'Danil Petrov',
                rating: 10,
            }
        ]
    },
    {
        index: '223',
        title: 'IT sphere2',
        rating: 9,
        users: [
            {
                index: '322',
                name: 'Arseniy Ivanov1',
                rating: 9,
            },
            {
                index: '228',
                name: 'Ivan Lukanov1',
                rating: 9,
            },
            {
                index: '007',
                name: 'Danil Petrov1',
                rating: 9,
            }
        ]
    },
    {
        index: '423',
        title: 'IT sphere3',
        rating: 8,
        users: [
            {
                index: '522',
                name: 'Arseniy Ivanov2',
                rating: 8,
            },
            {
                index: '528',
                name: 'Ivan Lukanov2',
                rating: 8,
            },
            {
                index: '507',
                name: 'Danil Petrov2',
                rating: 8,
            }
        ]
    }
]);

export default connect(
    () => ({
        companies: mockCompanies
    }),
    null
)(RatingComponent);
