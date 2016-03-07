import React, { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

/**
 * One example of using react-motion (0.3.0) within react-router (v1.0.0-rc3).
 *
 * Usage is simple, and really only requires two things–both of which are
 * injected into your app via react-router–pathname and children:
 *
 *   <RouteTransition pathname={this.props.pathname}>
 *     {this.props.children}
 *   </RouteTransition>
 */
const RouteTransition = React.createClass({
  propTypes: {
    pathname: PropTypes.string.isRequired
  },

  willEnter() {
    return {
      handler: this.props.children,
      opacity: spring(0),
      scale: spring(0.95)
    };
  },

  willLeave(key, value) {
    return {
      handler: value.handler,
      opacity: spring(0),
      scale: spring(0.95)
    };
  },

  getStyles() {
    const { children, pathname } = this.props;

    return {
      [pathname]: {
        handler: children,
        opacity: spring(1),
        scale: spring(1)
      }
    };
  },

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolated =>
          <div>
            {Object.keys(interpolated).map(key =>
              <div
                key={`${key}-transition`}
                styles={{
                  position: 'absolute',
                  opacity: interpolated[key].opacity,
                  transform: `scale(${interpolated[key].scale})`
                }}
              >
                {interpolated[key].handler}
              </div>
            )}
          </div>
        }
      </TransitionMotion>
    );
  }
});

export default RouteTransition;