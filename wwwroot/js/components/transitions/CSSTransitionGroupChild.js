/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule ReactCSSTransitionGroupChild
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var CSSCore = require('fbjs/lib/CSSCore');
var ReactTransitionEvents = require('react/lib/ReactTransitionEvents');

var onlyChild = require('react/lib/onlyChild');

// We don't remove the element from the DOM until we receive an animationend or
// transitionend event. If the user screws up and forgets to add an animation
// their node will be stuck in the DOM forever, so we detect if an animation
// does not start and if it doesn't, we just call the end listener immediately.
var TICK = 17;

var ReactCSSTransitionGroupChild = React.createClass({
    displayName: 'ReactCSSTransitionGroupChild',

    propTypes: {
        name: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.shape({
            enter: React.PropTypes.string,
            leave: React.PropTypes.string,
            active: React.PropTypes.string
        }), React.PropTypes.shape({
            enter: React.PropTypes.string,
            enterActive: React.PropTypes.string,
            leave: React.PropTypes.string,
            leaveActive: React.PropTypes.string,
            appear: React.PropTypes.string,
            appearActive: React.PropTypes.string
        })]).isRequired,

        // Once we require timeouts to be specified, we can remove the
        // boolean flags (appear etc.) and just accept a number
        // or a bool for the timeout flags (appearTimeout etc.)
        appear: React.PropTypes.bool,
        enter: React.PropTypes.bool,
        leave: React.PropTypes.bool,
        appearTimeout: React.PropTypes.number,
        enterTimeout: React.PropTypes.number,
        leaveTimeout: React.PropTypes.number,
        onAppearStart: React.PropTypes.func,
        onAppearEnd: React.PropTypes.func,
        onEnterStart: React.PropTypes.func,
        onEnterEnd: React.PropTypes.func,
        onLeaveStart: React.PropTypes.func,
        onLeaveEnd: React.PropTypes.func
    },

    transition: function (animationType, finishCallback, userSpecifiedDelay) {
        var node = ReactDOM.findDOMNode(this);

        if (!node) {
            if (finishCallback) {
                finishCallback();
            }
            return;
        }

        var className = this.props.name[animationType] || this.props.name + '-' + animationType;
        var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
        var timeout = null;

        var endListener = function (e) {
            if (e && e.target !== node) {
                return;
            }

            clearTimeout(timeout);

            CSSCore.removeClass(node, className);
            CSSCore.removeClass(node, activeClassName);

            ReactTransitionEvents.removeEndEventListener(node, endListener);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            if (finishCallback) {
                finishCallback();
            }
        };

        CSSCore.addClass(node, className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);

        // If the user specified a timeout delay.
        if (userSpecifiedDelay) {
            // Clean-up the animation after the specified delay
            timeout = setTimeout(endListener, userSpecifiedDelay);
            this.transitionTimeouts.push(timeout);
        } else {
            // DEPRECATED: this listener will be removed in a future version of react
            ReactTransitionEvents.addEndEventListener(node, endListener);
        }
    },

    queueClass: function (className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function () {
        if (this.isMounted()) {
            this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, ReactDOM.findDOMNode(this)));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    componentWillMount: function () {
        this.classNameQueue = [];
        this.transitionTimeouts = [];
    },

    componentWillUnmount: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.transitionTimeouts.forEach(function (timeout) {
            clearTimeout(timeout);
        });
    },

    componentReset: function(){
        var node = ReactDOM.findDOMNode(this);

        if (!node) {
            return;
        }

        let removeClasses = (animationType) => {
            var className = this.props.name[animationType] || this.props.name + '-' + animationType;
            var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';

            CSSCore.removeClass(node, className);
            CSSCore.removeClass(node, activeClassName);
        }

        removeClasses('appear');
        removeClasses('enter');
        removeClasses('leave');

        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.transitionTimeouts.forEach(function (timeout) {
            clearTimeout(timeout);
        });
    },

    componentWillAppear: function (done) {
        if(this.props.onAppearStart){
            this.props.onAppearStart();
        }

        if (this.props.appear) {
            this.transition('appear', done, this.props.appearTimeout);
        } else {
            done();
        }
    },

    componentDidAppear: function(){
        if(this.props.onAppearEnd){
            this.props.onAppearEnd();
        }
    },

    componentWillEnter: function (done) {
        if(this.props.onEnterStart){
            this.props.onEnterStart();
        }

        if (this.props.enter) {
            this.transition('enter', done, this.props.enterTimeout);
        } else {
            done();
        }
    },

    componentDidEnter: function(){
        if(this.props.onEnterEnd){
            this.props.onEnterEnd();
        }
    },

    componentWillLeave: function (done) {
        if(this.props.onLeaveStart){
            this.props.onLeaveStart();
        }
        if (this.props.leave) {
            this.transition('leave', done, this.props.leaveTimeout);
        } else {
            done();
        }
    },

    componentDidLeave: function(){
        if(this.props.onLeaveEnd){
            this.props.onLeaveEnd();
        }
    },

    render: function () {
        return onlyChild(this.props.children);
    }
});

module.exports = ReactCSSTransitionGroupChild;