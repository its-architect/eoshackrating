import React, { PureComponent } from 'react';
import styles from './styles.scss';
import { AvatarComponent, RatingComponent } from 'components/shared';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import Chart from 'chart.js';

const DATA_ID = {
    RATING: 'rating',
    ACTIVITY: 'activity'
};

class UserRatingComponent extends PureComponent {
    state = {
        chartRef: null
    };
    /**
     * Save canvas ref to use when draw chart
     *
     * @param {Object} ref
     */
    handleSaveChartRef = ( ref ) => this.setState({ chartRef: ref });

    handleDrawChart = () => (
        new Chart(this.state.chartRef, {
            type: 'line',
            data: {
                labels: [ 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' ],
                datasets: [ {
                    label: 'Rating',
                    yAxisID: DATA_ID.RATING,
                    data: [ 12, 11, 3, 1, 2, 3 ],
                    borderColor: styles.ratingLineColor,
                    backgroundColor: styles.ratingBackgroundColor,
                    borderWidth: styles.ratingBorderWidth
                }, {
                    label: 'Activity',
                    yAxisID: DATA_ID.ACTIVITY,
                    data: [ 1, 7, 3, 9, 21, 30 ],
                    borderColor: styles.activityLineColor,
                    backgroundColor: styles.activityBackgroundColor,
                    borderWidth: styles.activityBorderWidth
                } ]
            },
            options: {
                scales: {
                    yAxes: [ {
                        id: DATA_ID.RATING,
                        type: 'linear',
                        position: 'left',
                    }, {
                        id: DATA_ID.ACTIVITY,
                        type: 'linear',
                        position: 'right',
                    } ]
                }
            }
        })
    );

    render() {
        const { user } = this.props;
        const { handleSaveChartRef, handleDrawChart } = this;

        if ( this.state.chartRef ) {
            handleDrawChart();
        }

        return (
            <div className={ styles.page }>
                <div className={ styles.mainInfo }>
                    <div>
                        <h2 className={ styles.header }>
                            <span className={ styles.name }>
                                { user.get('name') }
                            </span>
                            <span>
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
                <div className={ styles.chartBox }>
                    <div className={ styles.chart }>
                        <canvas
                            ref={ handleSaveChartRef }
                            width='400'
                            height='400'
                        />
                    </div>
                    <div className={ styles.chartInfo }>
                        <p>
                            <strong>Rating</strong> is the measure of the stability of the programmer&apos;s work that we have introduced.
                        </p>
                        <ol>
                            <li>
                                <math>η</math>
                                (ETA) is a random value of the programmer&apos;s activity time, with an unknown
                                distribution
                                function, but with the known mathematical expectation
                                <math>a = E (η)</math>
                                and the root-mean-square
                                deviation
                                <math>σ = √ Var (η)</math>

                            </li>
                            <li>
                                <math>ξ</math>
                                (CSI) is a normally distributed random variable obtained on the basis of the first
                                quantity with the above parameters
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

UserRatingComponent.propTypes = {
    user: ImmutablePropTypes.map.isRequired
};

export default UserRatingComponent;
