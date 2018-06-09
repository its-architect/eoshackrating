import React, { PureComponent } from 'react';
import styles from './styles.scss';
import SlideComponents from './slides';
import { Transition } from 'react-transition-group';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class LandingComponent extends PureComponent {
    state = {
        activeSlide: 0,
    };

    /**
     * Handle slide change
     * param {number} step
     */
    handleChangeSlide = ( step ) => {
        this.setState({ activeSlide: this.state.activeSlide + 1 });
    };

    render() {
        const { activeSlide } = this.state;
        const { handleChangeSlide } = this;

        return (
            <div className={ styles.page }>
                <div>
                    ------------
                </div>
                <button
                    onClick={ handleChangeSlide }
                >
                    Toggle
                </button>
                { SlideComponents.map(( SlideComponent, index ) => (
                    <Transition
                        key={ index }
                        appear
                        in={ activeSlide === index }
                        timeout={ 1000 }
                        unmountOnExit
                    >
                        { animationState => (
                            <div
                                className={ cx({
                                    [styles.slideEntering]: animationState === 'entering',
                                    [styles.slideEntered]: animationState === 'entered',
                                    [styles.slideExiting]: animationState === 'exiting',
                                }) }
                            >
                                { animationState }
                                <SlideComponent />
                            </div>
                        ) }
                    </Transition>
                )) }
            </div>
        );
    }
}

export default LandingComponent;
