/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule CSSTransitionGroup
 */

'use strict';

var React = require('react');

var assign = require('react/lib/Object.assign');

var ReactTransitionGroup = require('react-addons-transition-group');
var CSSTransitionGroupChild = require('./CSSTransitionGroupChild');

function createTransitionTimeoutPropValidator(transitionType) {
    var timeoutPropName = 'transition' + transitionType + 'Timeout';
    var enabledPropName = 'transition' + transitionType;

    return function (props) {
        // If the transition is enabled
        if (props[enabledPropName]) {
            // If no timeout duration is provided
            if (props[timeoutPropName] == null) {
                return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

                // If the duration isn't a number
            } else if (typeof props[timeoutPropName] !== 'number') {
                return new Error(timeoutPropName + ' must be a number (in milliseconds)');
            }
        }
    };
}

var CSSTransitionGroup = React.createClass({
    displayName: 'CSSTransitionGroup',

    propTypes: {
        transitionName: CSSTransitionGroupChild.propTypes.name,

        transitionAppear: React.PropTypes.bool,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool,
        transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
        transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
        transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave'),
        onEnterStart: React.PropTypes.func,
        onEnterEnd: React.PropTypes.func,
        onLeaveStart: React.PropTypes.func,
        onLeaveEnd: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            transitionAppear: false,
            transitionEnter: true,
            transitionLeave: true
        };
    },

    _wrapChild: function (child) {
        // We need to provide this childFactory so that
        // CSSTransitionGroupChild can receive updates to name, enter, and
        // leave while it is leaving.
        return React.createElement(CSSTransitionGroupChild, {
            name: this.props.transitionName,
            appear: this.props.transitionAppear,
            enter: this.props.transitionEnter,
            leave: this.props.transitionLeave,
            appearTimeout: this.props.transitionAppearTimeout,
            enterTimeout: this.props.transitionEnterTimeout,
            leaveTimeout: this.props.transitionLeaveTimeout,
            onEnterStart: this.props.onEnterStart,
            onEnterEnd: this.props.onEnterEnd,
            onLeaveStart: this.props.onLeaveStart,
            onLeaveEnd: this.props.onLeaveEnd
        }, child);
    },

    render: function () {
        return React.createElement(ReactTransitionGroup, assign({}, this.props, { childFactory: this._wrapChild }));
    }
});

module.exports = CSSTransitionGroup;