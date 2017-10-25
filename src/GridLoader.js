import * as React from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

/**
 * @type {Object}
 */
const keyframes = {
    '0%': {
        transform: 'scale(1)'
    },
    '50%': {
        transform: 'scale(0.5)',
        opacity: 0.7
    },
    '100%': {
        transform: 'scale(1)',
        opacity: 1
    }
};

/**
 * @type {String}
 */
const animationName = insertKeyframesRule(keyframes);

/**
 * @param  {Number} top
 * @return {Number}
 */
function random(top) {
    return Math.random() * top
}

export default class GridLoader extends React.Component {
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
        const animationDuration = ((random(100) / 100) + 0.6) + 's';
        const animationDelay = ((random(100) / 100) - 0.2) + 's';

        const animation = [animationName, animationDuration, animationDelay, 'infinite', 'ease'].join(' ');
        const animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
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
            const style = {
                width: (parseFloat(this.props.size) * 3) + parseFloat(this.props.margin) * 6,
                fontSize: 0
            };

            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={style}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
                        <div style={this.getStyle(3)}></div>
                        <div style={this.getStyle(4)}></div>
                        <div style={this.getStyle(5)}></div>
                        <div style={this.getStyle(6)}></div>
                        <div style={this.getStyle(7)}></div>
                        <div style={this.getStyle(8)}></div>
                        <div style={this.getStyle(9)}></div>
                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        return this.renderLoader(this.props.loading);
    }
}
