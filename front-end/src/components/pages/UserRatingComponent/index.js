import React, { PureComponent } from 'react';
import styles from './styles.scss';
import { AvatarComponent, RatingComponent, SpinnerComponent } from 'components/shared';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import Chart from 'chart.js';

const DATA_ID = {
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

    handleDrawChart = () => {
        const labels = [];
        const data = [];
        if ( this.props.user ) {
            this.props.user.get('activities').forEach(activity => {
                const date = new Date(activity.get('time_slot'));
                labels.push(date.getHours());
                data.push(activity.get('overall'));
            });
        }
        return new Chart(this.state.chartRef, {
            type: 'line',
            data: {
                labels,
                datasets: [ {
                    label: 'Activity',
                    yAxisID: DATA_ID.ACTIVITY,
                    data,
                    borderColor: styles.activityLineColor,
                    backgroundColor: styles.activityBackgroundColor,
                    borderWidth: styles.activityBorderWidth
                } ]
            },
            options: {
                scales: {
                    xAxes: [ {
                        ticks: {
                            maxTicksLimit: 15,
                        }
                    } ],
                    yAxes: [ {
                        id: DATA_ID.ACTIVITY,
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            beginAtZero: true
                        }
                    } ]
                }
            }
        });
    };

    render() {
        const { user } = this.props;
        const { handleSaveChartRef, handleDrawChart } = this;

        if ( this.state.chartRef ) {
            handleDrawChart();
        }

        return (
            <div className={ styles.page }>
                <div className={ styles.mainInfo }>
                    {
                        user &&
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
                                    rating={ 10 || user.get('rating') } // TODO fix it!
                                />
                            </div>
                        </div>
                    }
                    <div className={ styles.avatarBox }>
                        <AvatarComponent
                            className={ styles.avatar }
                            avatar={ user ? user.get('avatar') : null }
                        />
                        { user &&
                        <div className={ classNames(styles.ratingBox, styles.hideOnDesktop) }>
                            Current rating
                            <RatingComponent
                                className={ styles.rating }
                                rating={ 10 || user.get('rating') } // TODO fix it!
                            />
                        </div>
                        }

                        { !user && <SpinnerComponent /> }
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
    user: ImmutablePropTypes.map
};

export default UserRatingComponent;
