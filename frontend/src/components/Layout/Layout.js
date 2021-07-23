import React, { Component } from "react";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import classes from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <div className={classes.Box}>
        <div className={classes.Header}>
          <Logo className={classes.Logo} />
        </div>
        {this.props.children}
        <div className={classes.Footer}>      

        </div>
      </ div>
    );
  }
}

export default Layout;
