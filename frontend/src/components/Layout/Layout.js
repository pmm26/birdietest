import React, { Component } from "react";

import classes from "./Layout.module.css";
import NavigationItem from './NavigationItem';

class Layout extends Component {
  render() {
    return (
      <>
        <div className={classes.Toolbar}>
          <div className={classes.Logo}>Birdie</div>
          <nav className={classes.DesktopOnly}>

            <ul className={classes.NavigationItems}>
              <NavigationItem link="/" active={true} >Day</NavigationItem>
              <NavigationItem link="/">Night</NavigationItem>
            </ul>
          </nav>
        </div>
        {this.props.children}
      </>
    );
  }
}

export default Layout;
