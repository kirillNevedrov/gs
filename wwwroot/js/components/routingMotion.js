import React from 'react';
import {Motion, StaggeredMotion, TransitionMotion, spring} from 'react-motion';
import uuid from 'node-uuid';

let counter = 0;

class RoutingMotion extends React.Component {
    constructor() {
        super();
        this.state = {
            isReset: false
        };
        this.lastKey = null;
        this.previousKey = null;
        this.lastPath = null;
        this.previousPath = null;
        this.lastChild = null;
        this.previousChild = null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isReset: true
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.isReset)
        {
            this.setState({
                isReset: false
            });
        }
    }

    willLeave(transition) {
        if (transition.data.path === this.previousPath) {
            //if (transition.style.x.val === 0) {
            //    return {x: 0};
            //}

            return {x: spring(-100, {stiffness: 50, damping: 5})};
        }

        return null;
    }

    willEnter() {
        return {x: 100};
    }

    render() {
        if (this.lastPath !== this.props.location.pathname) {
            this.previousPath = this.lastPath;
            this.lastPath = this.props.location.pathname;
            this.previousChild = this.lastChild ? React.cloneElement(this.lastChild) : null;
            this.lastChild = this.props.children;
            this.previousKey = this.lastKey;
            this.lastKey = uuid.v1();
        }

        let styles = this.state.isReset && this.previousChild
            ? [{
                            key: this.previousKey,
                            style:{x: 0},
                            data: {path: this.previousPath, children: this.previousChild}
                            }]
            : [{
            key: this.lastKey,
            style:{x: spring(0, {stiffness: 50, damping: 5})},
            data: {path: this.lastPath, children: this.props.children}
        }];


        return (
            <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave.bind(this)}
                defaultStyles={[{
                            key: this.lastKey,
                            style:{x: 100},
                            data: {path: this.lastPath, children: this.props.children}
                            }]}
                styles={styles}
            >
                {interpolatedStyles => {


                    return (<div>
                        {interpolatedStyles.map(config => {
                            let style = {transform: `translateX(${config.style.x}%)`};

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
