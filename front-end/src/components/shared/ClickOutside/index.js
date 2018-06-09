import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

class ClickOutside extends Component {
    constructor( props ) {
        super(props);
        this.isTouch = false;
    }

    static propTypes = {
        onClickOutside: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.element,
        ]).isRequired,
    };

    componentDidMount() {
        document.addEventListener('touchend', this._handleClick, true);
        document.addEventListener('click', this._handleClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener('touchend', this._handleClick, true);
        document.removeEventListener('click', this._handleClick, true);
    }

    /**
     * Sage dom element to class variable
     *
     * @param ref
     */
    _getElement = ( ref ) => {
        this.container = ref;
    };

    /**
     * Lunch onClickOutside logic
     */
    _handleClick = e => {
        if ( e.type === 'touchend' ) {
            this.isTouch = true;
        }
        if ( e.type === 'click' && this.isTouch ) {
            return;
        }
        if ( !this.container.contains(e.target) ) {
            this.props.onClickOutside(e);
        }
    };
    
    render() {
        const { children, onClickOutside, ...props } = this.props;
        return <div { ...props } ref={ this._getElement }>{ children }</div>;
    }
}

export default ClickOutside;
