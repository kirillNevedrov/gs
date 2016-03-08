import React from 'react';
import {Motion, StaggeredMotion, TransitionMotion, spring} from 'react-motion';
import uuid from 'node-uuid';

let counter = 0;

class RoutingMotion extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        this.lastKey = null;
        this.previousKey = null;
        this.lastPath = null;
        this.previousPath = null;
    }

    willLeave(transition) {
        if (transition.data.path === this.previousPath) {
            return {y: spring(-100, {stiffness: 50, damping: 5}), x: 0};// add isLeaving bool key here?
        }

        return null;
    }

    willEnter() {
        return {x: 100, y: 0};
    }

    render() {
        if (this.lastPath !== this.props.location.pathname) {
            this.previousPath = this.lastPath;
            this.lastPath = this.props.location.pathname;
            this.previousKey = this.lastKey;
            this.lastKey = uuid.v1();
        }

        return (
            <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave.bind(this)}
                defaultStyles={[{
                            key: this.lastKey,
                            style:{x: 100, y: 0},
                            data: {path: this.lastPath, children: this.props.children}
                            }]}
                styles={[{
            key: this.lastKey,
            style:{x: spring(0, {stiffness: 50, damping: 5}), y: 0},
            data: {path: this.lastPath, children: this.props.children}
        }]}
            >
                {interpolatedStyles => {


                    return (<div>
                        {interpolatedStyles.map(config => {
                            let isLeaving = config.data.path !== this.lastPath
                            let style = {transform: `translateX(${isLeaving ? config.style.y: config.style.x}%)`};

                            let children = React.cloneElement(config.data.children, {
                                key: config.key,
                                style: style
                            });

                            return children;
                        })}
                    </div>);

                }}


            </TransitionMotion>
        );
    }
}

RoutingMotion.propTypes = {};
RoutingMotion.defaultProps = {};

export default RoutingMotion;
