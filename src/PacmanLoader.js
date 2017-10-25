import * as React from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

/**
 * @type {Object}
 */
const animations = {};

export default class PacmanLoader extends React.Component {
    /**
     * @type {Object}
     */
    static propTypes = {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.number,
        margin: PropTypes.number,
    }

    /**
     * @type {Object}
     */
    static defaultProps = {
        loading: true,
        color: '#ffffff',
        size: 25,
        margin: 2
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
        const size = this.props.size;
        let animationName = animations[size];

        if (! animationName) {
            const keyframes = {
                '75%': {
                    opacity: 0.7
                },
                '100%': {
                    transform: 'translate(' + (-4 * size) + 'px,' + (-size / 4) + 'px)'
                }
            };
            animationName = animations[size] = insertKeyframesRule(keyframes);
        }

        const animation = [animationName, '1s', i*0.25 + 's', 'infinite', 'linear'].join(' ');
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
        if (i == 1) {
            const s1 =  this.props.size + 'px solid transparent';
            const s2 =  this.props.size + 'px solid ' + this.props.color;

            return {
                width: 0,
                height: 0,
                borderRight: s1,
                borderTop: s2,
                borderLeft: s2,
                borderBottom: s2,
                borderRadius: this.props.size
            };
        }

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                width: 10,
                height: 10,
                transform: 'translate(0, '+ -this.props.size / 4 + 'px)',
                position: 'absolute',
                top: 25,
                left: 100
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
                position: 'relative',
                fontSize: 0
            };

            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={style}>
                        <div style={this.getStyle(1)}/>
                        <div style={this.getStyle(2)}/>
                        <div style={this.getStyle(3)}/>
                        <div style={this.getStyle(4)}/>
                        <div style={this.getStyle(5)}/>
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
