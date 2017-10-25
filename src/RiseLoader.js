import * as React from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

/**
 * @type {Number}
 */
const riseAmount = 30;

/**
 * @type {Object}
 */
const keyframesEven = {
    '0%': {
        transform: 'scale(1.1)'
    },
    '25': {
        transform: 'translateY(-' + riseAmount + 'px)'
    },
    '50%': {
        transform: 'scale(0.4)'
    },
    '75%': {
        transform: 'translateY(' + riseAmount + 'px)'
    },
    '100%': {
        transform: 'translateY(0) scale(1.0)'
    }
};

/**
 * @type {Object}
 */
const keyframesOdd = {
    '0%': {
        transform: 'scale(0.4)'
    },
    '25': {
        transform: 'translateY(' + riseAmount + 'px)'
    },
    '50%': {
        transform: 'scale(1.1)'
    },
    '75%': {
        transform: 'translateY(-' + riseAmount + 'px)'
    },
    '100%': {
        transform: 'translateY(0) scale(0.75)'
    }
};

/**
 * @type {String}
 */
const animationNameEven = insertKeyframesRule(keyframesEven);

/**
 * @type {String}
 */
const animationNameOdd = insertKeyframesRule(keyframesOdd);

export default class RiseLoader extends React.Component {
    /**
     * @type {Object}
     */
    static propTypes = {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.string,
        margin: PropTypes.string,
    }

    /**
     * @type {Object}
     */
    static defaultProps = {
        loading: true,
        color: '#ffffff',
        size: '15px',
        margin: '2px',
    }

    /**
     * @return {Object}
     */
    getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle(i) {
        const animation = [i%2==0? animationNameEven: animationNameOdd, '1s', '0s', 'infinite', 'cubic-bezier(.15,.46,.9,.6)'].join(' ');
        const animationFillMode = 'both';

        return { animation, animationFillMode };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle(i) {
        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        );
    }

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader(loading) {
        if (loading) {
            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={this.getStyle(1)}></div>
                    <div style={this.getStyle(2)}></div>
                    <div style={this.getStyle(3)}></div>
                    <div style={this.getStyle(4)}></div>
                    <div style={this.getStyle(5)}></div>
                </div>
            );
        }

        return null;
    }

    render() {
        return this.renderLoader(this.props.loading);
    }
}
