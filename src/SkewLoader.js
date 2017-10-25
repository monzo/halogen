import * as React from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

/**
 * @type {Object}
 */
const keyframes = {
    '25%': {
        transform: 'perspective(100px) rotateX(180deg) rotateY(0)'
    },
    '50%': {
        transform: 'perspective(100px) rotateX(180deg) rotateY(180deg)'
    },
    '75%': {
        transform: 'perspective(100px) rotateX(0) rotateY(180deg)'
    },
    '100%': {
        transform: 'perspective(100px) rotateX(0) rotateY(0)'
    }
};

/**
 * @type {String}
 */
const animationName = insertKeyframesRule(keyframes);

export default class SkewLoader extends React.Component {

    /**
     * @type {Object}
     */
    static propTypes = {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.string,
    }

    /**
     * @type {Object}
     */
    static defaultProps = {
        loading: true,
        color: '#ffffff',
        size: '20px',
    }

    /**
     * @return {Object}
     */
    getSharpStyle() {
        return {
            width: 0,
            height: 0,
            borderLeft: this.props.size + ' solid transparent',
            borderRight: this.props.size + ' solid transparent',
            borderBottom: this.props.size + ' solid '+ this.props.color,
            verticalAlign: this.props.verticalAlign
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle(i) {
        const animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
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
            this.getSharpStyle(i),
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
                    <div style={this.getStyle()}></div>
                </div>
            );
        };

        return null;
    }

    render() {
        return this.renderLoader(this.props.loading);
    }
}
