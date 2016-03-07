/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../img/logo.png';
import {
  AppBar
} from 'material-ui';
import LeftNavBar from './Sidebar.react';
import LoginCard from './LoginCard.react';

import { RouteTransition } from 'react-router-transition';

class App extends Component {
  onHamburgerTouch = (e) => {
    this.refs.leftNav.handleToggle();
    console.log("hhhh");
  }

  render() {
    return (
      <div>

        <LeftNavBar
          ref="leftNav"
        />
        <AppBar
          onLeftIconButtonTouchTap={this.onHamburgerTouch}
          title="RoastWeb"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div className="wrapper" style={{paddingTop: 20}}>

          <RouteTransition
            pathname={this.props.location.pathname}
            atEnter={{ translateX: 600 }}
            atLeave={{ translateX: -600 }}
            atActive={{ translateX: 0 }}
            mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
          >
            {this.props.children}
          </RouteTransition>
        </div>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
