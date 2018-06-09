import React, { PureComponent } from 'react';
import styles from './styles.scss';
import { SlideOneComponent } from './slides';

class LandingComponent extends PureComponent {
    state = {
        activeSlide: 0,
    };

    /**
     * Handle slide change
     * param {number} step
     */
    handleChangeSlide = ( step ) => step;

    render() {
        const { activeSlide } = this.state;

        const slides = [
            SlideOneComponent,
        ];

        const ActiveSlide = slides[ activeSlide ];

        return (
            <div className={ styles.page }>
                <div>
                    ------------
                </div>
                <ActiveSlide />
            </div>
        );
    }
}

export default LandingComponent;
